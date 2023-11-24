import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

const Logout = () => {
	const handleLogout = () => {
		const { setAuthenticated } = useContext(AuthContext);
		setAuthenticated(false);
	};
	return (
		<div onClick={handleLogout}>
			Logout
			<Link to="/" onClick={handleLogout} style={{ textDecoration: "none", color: "inherit" }}>
				SpotTracks
			</Link>
		</div>
	);
};

export default Logout;
