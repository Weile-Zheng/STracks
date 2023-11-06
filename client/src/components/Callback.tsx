import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**************************************************
 * Callback FUNCTIONAL component.
 *
 * Reroute access_denied error back to the login page(root) of the website
 **************************************************/

const Callback = () => {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		if (params.get("error") === "access_denied") {
			navigate("/");
		}
	}, [location, navigate]);
	return null;
};

export default Callback;
