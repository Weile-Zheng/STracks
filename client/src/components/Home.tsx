import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

/**************************************************
 * Home PAGE component.
 *
 * User profile page after successfully authenticate with spotify
 * Return user to login page if unsuccessful.
 **************************************************/

interface HomeProps {
	isAuthenticated: boolean;
}

const Home = ({ isAuthenticated }: HomeProps) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			console.log("Access Not Allowed");
			navigate("/");
		}
	}, [isAuthenticated]);

	if (!isAuthenticated) return null;

	console.log("Authentication Success");
	return <div>Welcome to the page</div>;
};

export default Home;
