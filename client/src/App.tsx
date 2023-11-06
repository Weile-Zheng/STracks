import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup"; // Make sure to import Signup
import Header from "./components/Header";

function App() {
	return (
		<>
			<Header />
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />{" "}
					{/* Use Login or another component here */}
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
