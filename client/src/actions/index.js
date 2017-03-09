import axios from "axios";
import { browserHistory } from "react-router";
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, CREATE_POSTS, FETCH_POSTS, FETCH_POST, DELETE_POST } from "./types";
import authReducer from "../reducers/auth_reducer";

const ROOT_URL = "http://localhost:3000";

var config = {
	headers: { authorization: localStorage.getItem("token") }
}

export function createPost(props) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/newitem`, { props }, config )
		.then(request => {
			dispatch({
				type: CREATE_POSTS,
				payload: request
			});
			browserHistory.push("/items");
		});
	}
}

export function signinUser({ email, password }) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/signin`, { email, password })
			.then(response => {
				// this only kickstarts if the request was good...
				// we now update the state to indicate authenticated user
				dispatch({ type: AUTH_USER });
				// This will put the token in localStorage.  It's safe!!
				localStorage.setItem("token", response.data.token);
				// this sends us off to the /newitem view
				browserHistory.push("/newitem");
			})
			.catch(response => dispatch(authError("Bad login info")));
	}
}

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	};
}

// purpose of type is to catch unauth_user case.
// flips auth flag to false and there won't be any links associated with them
// other thing to do is get rid of token
export function signoutUser() {
	localStorage.removeItem("token");

	return { type: UNAUTH_USER };
}

export function signupUser({ email, password }) {
	return function(dispatch) {
		// submit email/pw to the server
		axios.post(`${ROOT_URL}/signup`, { email, password })
			.then(response => {
				dispatch({type: AUTH_USER });

				// update the token
				localStorage.setItem("token", response.data.token);
				browserHistory.push("/newitem");
			})
			.catch(response => dispatch(authError(response.data.error)));
	}
}

export function fetchPosts() {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/items`, config)
		.then( (response) => {
			console.log("Response", response)
			dispatch({
				type: FETCH_POSTS,
				payload: response
			});
		});
	}
}

export function fetchPost(id) {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/items/${id}`, config)
		.then( (response) => {
			console.log("Response", response);
			dispatch({
				type: FETCH_POST,
				payload: response
			});
		});
	}
}

export function deletePost(id) {
	return function(dispatch) {
		axios.delete(`${ROOT_URL}/items/${id}`, config)
		.then( (response) => {
			dispatch({
				type: DELETE_POST,
				payload: response
			});
			browserHistory.push("/items")
		});
	}
}