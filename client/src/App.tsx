import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup"; // Make sure to import Signup
import Header from "./components/Header";
import Callback from "./components/Callback";
import Home from "./components/Home";
import { AuthContext } from "./components/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	const [isAuthenticated, setAuthenticated] = useState(false);
	const [code, setCode] = useState("");
	const [accessToken, setAccessToken] = useState("");
	return (
		<>
			<AuthContext.Provider
				value={{
					isAuthenticated,
					setAuthenticated,
					code,
					setCode,
					accessToken,
					setAccessToken,
				}}
			>
				<Router>
					<Header isAuthenticated={isAuthenticated} />
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/callback" element={<Callback />} />
						<Route path="/home" element={<Home />} />
					</Routes>
				</Router>
			</AuthContext.Provider>
		</>
	);
}

export default App;

/*
In JSX, when you provide a value for a prop and the name of the prop matches the name o
f a variable in the current scope, you can use a shorthand. In your case, the prop names
 (isAuthenticated, setAuthenticated, code, setCode, accessToken, setAccessToken) match 
 the variable names in the current scope.
 */
