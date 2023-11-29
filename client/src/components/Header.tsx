import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
/**************************************************
 * Header FEATURE component.
 *
 * Parent Component: app.tsx
 * Context Modify: None
 *
 * This component displays a header that is meant to be on top of the web
 * page at all times. Navigate to root page when clicked.
 **************************************************/

const Header = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
	const { setAuthenticated } = useContext(AuthContext);

	const handleLogout = () => {
		setAuthenticated(false);
	};
	return (
		<div className="inner" id="heading">
			<h3>
				<Link to="/" onClick={handleLogout} style={{ textDecoration: "none", color: "inherit" }}>
					STracks
				</Link>
			</h3>
			<nav className="nav nav-masthead justify-content-center">
				{!isAuthenticated && <p>Getting Started</p>}
			</nav>
		</div>
	);
};

export default Header;
