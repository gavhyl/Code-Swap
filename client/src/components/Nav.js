import React, {Component} from "react";
import {Navbar, Nav, NavItem, NavDropdown, DropdownButton, MenuItem, CollapsibleNav} from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router";

class NavBarHeader extends Component {
	renderLinks() {
		if(this.props.authenticated) {
			return [
				<NavItem key={3} href="/signout">Sign Out</NavItem>,
				<NavDropdown key={4} title="Cool Stuff" id="basic-nav-dropdown">
			        <MenuItem key={4.1}>Action</MenuItem>
			        <MenuItem key={4.2}>Another action</MenuItem>
			        <MenuItem key={4.3}>Something else here</MenuItem>
			        <MenuItem divider />
			        <MenuItem key={4.4}>Separated link</MenuItem>
		        </NavDropdown>
			];
		} else {
			return [
				<NavItem key={1} href="/signin">Sign In</NavItem>,
				<NavItem key={2} href="/signup">Sign Up</NavItem>,
		];
		}
	}

	render() {
		return(
			<Navbar>
			    <Navbar.Header>
			        <Navbar.Brand>
			            <a href="#">Bucket List</a>
			        </Navbar.Brand>
			    </Navbar.Header>
			    <Nav>
			    	{this.renderLinks()}
			    </Nav>
			</Navbar>
		);
	}
}

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated
	};
}

export default connect(mapStateToProps)(NavBarHeader);