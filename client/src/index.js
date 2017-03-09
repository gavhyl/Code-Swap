import React from "react";
import ReactDOM from "react-dom";
import reduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import App from "./components/app";
import reducers from "./reducers";
import Signin from "./components/auth/signin";
import Signup from "./components/auth/signup";
import RequireAuth from "./components/auth/require_auth";
import NewItem from "./components/list/newitem";
import ListsShow from "./components/list/list-items";
import ListShow from "./components/list/list-show";
import Signout from "./components/auth/signout";

var createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<Route path="signin" component={Signin} />
				<Route path="signout" component={Signout} />
				<Route path="signup" component={Signup} />
				<Route path="newitem" component={RequireAuth(NewItem)} />
				<Route path="items" component={RequireAuth(ListsShow)} />
				<Route path="items/:id" component={RequireAuth(ListShow)} />
			</Route>
		</Router>
	</Provider>
	, document.querySelector(".container"));