/**************************************************
 * Header FEATURE component.
 *
 * This component displays a header that is meant to be on top of the web
 * page at all times. Treat it as a logo. It should be included in al;
 * PAGE component
 **************************************************/

const Header = () => {
	return (
		<div className="inner" id="heading">
			<h3>SpotiTracks</h3>
			<nav className="nav nav-masthead justify-content-center">
				<p>Getting Started</p>
			</nav>
		</div>
	);
};

export default Header;
