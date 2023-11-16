import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup"; // Make sure to import Signup
import Header from "./components/Header";
import Callback from "./components/Callback";
import Home from "./components/Home";
import { AuthProvider } from "./components/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	const spotifyClient = "4c9d395af6dd467ab054393b3b189898";
	return (
		<>
			<Header />
			<AuthProvider>
				<Router>
					<Routes>
						<Route path="/" element={<Login clientID={spotifyClient} />} />
						<Route path="/signup" element={<Signup />} />
						<Route
							path="/callback"
							element={<Callback clientID={spotifyClient} />}
						/>
						<Route path="/home" element={<Home clientID={spotifyClient} />} />
					</Routes>
				</Router>
			</AuthProvider>
		</>
	);
}

export default App;
