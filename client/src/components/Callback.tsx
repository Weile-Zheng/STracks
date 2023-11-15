import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**************************************************
 * Callback FUNCTIONAL component.
 *
 * Reroute access_denied error back to the login page(root) of the website.
 **************************************************/

/**
 * The location object itself is updated as part of the React component lifecycle,
 * which is managed asynchronously by React. This means that if the URL changes (for
 * example, as a result of an asynchronous operation like an API call), the location
 * object might not be immediately updated.
 *
 * This is why using the useEffect hook is necessary.
 * The useEffect hook ensures that your logic runs after the component has
 * rendered and the location object has been updated.
 *
 * It execute after the component mounts, not as soon as it was rendered.
 */
const Callback = () => {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		if (params.get("error") === "access_denied") navigate("/");
		else if (params.get("code")) {
			console.log(params);
			navigate("/Home");
		}
	}, [location.search, navigate]);
	return null;
};

export default Callback;
