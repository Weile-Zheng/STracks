import { Link } from "react-router-dom";

/**************************************************
 * Header FEATURE component.
 *
 * Parent Component: app.tsx
 * Context Modify: None
 *
 * This component displays a header that is meant to be on top of the web
 * page at all times. Treat it as a logo. It should be included in al;
 * PAGE component
 **************************************************/

const Header = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
	return (
		<div className="inner" id="heading">
			<h3>
				<Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
					SpotTracks
				</Link>
			</h3>
			<nav className="nav nav-masthead justify-content-center">
				{!isAuthenticated && <p>Getting Started</p>}
			</nav>
		</div>
	);
};

export default Header;
