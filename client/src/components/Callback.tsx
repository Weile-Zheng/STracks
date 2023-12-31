import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ClientContext, AuthContext } from "./AuthContext";
import { getAccessToken } from "../scripts/oauth.js";

/**************************************************
 * Callback FUNCTIONAL component.
 * This component is used for rerouting only for legacy code purposes. Future 
 * rewriting is expected. 
 * 
 * PARENT: app.tsx
 * Context Modify: AuthContext -> isAuthenticated, code, accessToken.
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
	const { setAuthenticated, setCode, setAccessToken } = useContext(AuthContext);
	const clientID = useContext(ClientContext);
	
	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const code = params.get("code");

		if (params.get("error") === "access_denied") {
			navigate("/");
		} else if (code) {
			setAuthenticated(true);
			setCode(code);
			console.log(code);
			const fetchToken = async () => {
				const token = await getAccessToken(clientID, code);
				if (!token) navigate("/");
				setAccessToken(token);
				console.log(`Token: ${token}`);
				navigate("/Home");
			};
			fetchToken();
		}
	}, []); // Only run once

	return null;
};

export default Callback;
