import React, { Component } from "react";
import NavBarHeader from "./nav";
// import Video from "./video/video";
import Signin from "./auth/signin";
import NewItem from "./list/newitem";

export default class App extends Component {
	render() {
		return (
			<div>
				<NavBarHeader />
				{/*<Video />*/}
				{this.props.children}
			</div>
		);
	}
}