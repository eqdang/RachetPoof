import React from "react";
import { Link, NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import SearchBar from "../search/search_bar";

class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state= {};
		// this.handleLogout = this.handleLogout.bind(this);
	}

	// handleLogout(e) {
	// 	e.preventDefault();
	// 	this.props.logout();
	// }

	render() {
		const {logout, currentUser} = this.props;
		return (
			<div className="navbar">
				<ul>
					<li>
						<NavLink to="/" className="navbar-logo">
							Logo
						</NavLink>
					</li>
					<li>
						<NavLink to="/discover" className="navbar-home">
							Home
						</NavLink>
					</li>
					<li>
						<NavLink to="/stream" className="navbar-stream">
							Stream
						</NavLink>
					</li>
					<li>
						<NavLink to="/library" className="navbar-library">
							Library
						</NavLink>
					</li>
					<li>
						<SearchBar />
						{/* <form className="navbar-search">
							<input
								type="search"
								placeholder="Search"
								className="navbar-search-input"
							/>
							<button type="submit" className="navbar-search-button" />
						</form> */}
					</li>
					<li>
						<NavLink to="/upload" className="navbar-upload">
							Upload
						</NavLink>
					</li>
					<li>
						<Link
							to={`/users/${this.props.currentUser}`}
							className="navbar-profile"
						>
							Profile
						</Link>
					</li>
					<li>
						<Link to="/" onClick={e => logout()} className="navbar-logout">
							Log Out
						</Link>
					</li>
				</ul>
			</div>
		);
	}
};

export default withRouter(Navbar);