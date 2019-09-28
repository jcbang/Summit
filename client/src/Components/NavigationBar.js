import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Button } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
	.navbar {
		background-color: #222;
	}

	a,
	.navbar-nav .navbar-brand .nav-link {
		color: #bbb;

		&:hover {
			color: white;
		}
	}
`;

class NavigationBar extends Component {
	render() {
		return (
			<Styles>
				<Navbar expand="lg">
					<Navbar.Brand href="/">Summit</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							<input
								type="text"
								name="search"
								placeholder="Search"
								onChange={this.props.onChange}
							/>
							<Nav.Item>
								<Nav.Link>
									<Link to="/">Home</Link>
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link>
									<Link to="/userinfo">User Info</Link>
								</Nav.Link>
							</Nav.Item>
							<Button variant="outline-danger" onClick={this.props.handleLogout}>
								Logout
							</Button>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</Styles>
		);
	}
}

export default NavigationBar;
