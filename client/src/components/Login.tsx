import { redirectToAuthCodeFlow } from "../scripts/oauth.js";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ClientContext } from "./AuthContext.tsx";
import Tutorial from "./Tutorial.tsx";
/**************************************************
 * Login PAGE component.
 *
 * THIS IS THE HOMEPAGE OF THE WEBSITE
 * DO NOT CONFUSE WITH COMPONENT <HOME> WHICH IS USER HOME AFTER LOGGING IN
 *
 * Parent: app.tsx
 * Context Modify: None
 *
 * This component displays a login button and handles the login process.
 * When the button is clicked, it calls the `redirectToAuthCodeFlow` function
 * with a specific client ID.
 **************************************************/

const Login = () => {
	const clientID = useContext(ClientContext);

	const handleClick = () => {
		console.log("Logging in");
		redirectToAuthCodeFlow(clientID);
	};

	return (
		<>
			<div
				id="title-cover-container"
				className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column align-items-center justify-content-center text-white"
			>
				<main role="main" className="inner cover text-center">
					<h1 className="cover-heading">Import your Playlist</h1>
					<p className="lead">
						Import your playlists from other music platforms to Spotify. Get started by logging
						into Spotify.
					</p>
					<p className="lead">
						<button
							type="button"
							className="btn btn-lg btn-light"
							id="log-in-button"
							style={{ fontWeight: "bold" }}
							onClick={handleClick}
						>
							Log in
						</button>

						<Link
							to="/signup" // replace with your signup page URL
							className="btn btn-lg btn-light"
							id="Signup"
							style={{ fontWeight: "bold" }}
						>
							Signup
						</Link>
					</p>
				</main>
			</div>
		</>
	);
};

export default Login;
