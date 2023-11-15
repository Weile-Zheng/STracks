import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup"; // Make sure to import Signup
import Header from "./components/Header";
import Callback from "./components/Callback";
import Home from "./components/Home";
function App() {
	return (
		<>
			<Header />
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />{" "}
					<Route path="/signup" element={<Signup />} />
					<Route path="/callback" element={<Callback />} />
					<Route path="/home" element={<Home isAuthenticated={false} />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
