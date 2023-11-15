import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "./Authcontext";

/**************************************************
 * Home PAGE component.
 *
 * User profile page after successfully authenticate with spotify
 * Return user to login page if unsuccessful.
 **************************************************/
const Home = () => {
	const navigate = useNavigate();
	const { isAuthenticated, code } = useContext(AuthContext);

	useEffect(() => {
		if (!isAuthenticated) {
			console.log("Access Not Allowed");
			navigate("/");
		}
	}, [isAuthenticated]);

	if (!isAuthenticated) return null;

	console.log("Authentication Success");
	console.log(code);
	return <div>Welcome to the page</div>;
};

export default Home;
