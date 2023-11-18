import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { fetchProfile } from "../scripts/spotifyUtil.js";
import Export from "./Export";
/**************************************************
 * Home PAGE component.
 *
 * User profile page after successfully authenticate with spotify
 * Return user to login page if unsuccessful.
 *
 * PROPS: This component use the ClientIDProp
 **************************************************/

interface Profile {
	display_name: string;
	images: { url: string }[];
	id: string;
	email: string;
	uri: string;
	external_urls: { spotify: string };
	href: string;
}

const Home = () => {
	const { isAuthenticated, code, accessToken } = useContext(AuthContext);
	const [profile, setProfile] = useState<Profile>();

	//Security Check. Implement it in app for better result
	const navigate = useNavigate();
	if (!isAuthenticated) navigate("/");

	useEffect(() => {
		const profileWrapper = async () => {
			const data = await fetchProfile(accessToken);
			console.log(`USER profile: ${data}`);
			setProfile(data);
		};

		profileWrapper();
	}, [accessToken]); // Only re-run the effect if accessToken changes

	if (!profile) {
		return (
			<div
				className="d-flex justify-content-center align-items-center"
				style={{ height: "100vh" }}
			>
				<div className="spinner-border text-light" role="status"></div>
			</div>
		);
	}

	console.log("Profile Fetched");
	return (
		<>
			<div id="userProfile">
				<h1>{profile.display_name}</h1>

				<img src={profile.images[0].url} alt="Profile" width="200" height="200" />
				<p>{profile.images[0].url}</p>

				<p>{profile.id}</p>
				<p>{profile.email}</p>
				<a href={profile.external_urls.spotify}>{profile.uri}</a>
				<a href={profile.href}>{profile.href}</a>
				<Export />
			</div>
		</>
	);
};
export default Home;
