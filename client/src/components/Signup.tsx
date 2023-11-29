import { Link } from "react-router-dom";
import { useState } from "react";
/**************************************************
 * Signup PAGE component.
 *
 * Parent: App.tsx
 * Conext Modify: None
 *
 * This component displays a signup form with
 * cooresponding input boxes and titles.
 **************************************************/

const Signup = () => {
	const [isSubmit, setIsSubmit] = useState(false);
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		/*
		fetch("http://localhost:4000/test")
			.then((response) => response.text())
			.then((data) => console.log(data))
			.catch((error) => console.error("Error:", error));
			*/
		setIsSubmit(true);
	};

	const formFields = [
		{ id: "inputName", type: "text", placeholder: "Name", label: "Name" },
		{ id: "inputEmail", type: "email", placeholder: "Email", label: "Email" },
		{
			id: "inputSpotifyId",
			type: "text",
			placeholder: "SpotifyID",
			label: "SpotifyID (optional)",
		},
	];

	return (
		<div className="container bg-dark text-white py-4" id="SignupPage">
			<Link to="/" className="btn-close btn-close-white"></Link>
			{isSubmit && <h3>Submission received</h3>}
			{!isSubmit && (
				<div>
					<h1>Sign Up</h1>
					<p>
						The application is currently in production. Spotify Developer Platform Allows only a
						certain number of accounts to be authorized and tested for SpotTracks, please sign up
						below
					</p>
					<small>
						*If your signup was already approved, you can continue to login with Spotify
						authentication
					</small>
					<form onSubmit={handleSubmit}>
						{formFields.map((field) => (
							<div className="form-group mb-3" key={field.id}>
								<label htmlFor={field.id}>{field.label}</label>
								<input
									type={field.type}
									className="form-control"
									id={field.id}
									placeholder={field.placeholder}
									required={field.id !== "inputSpotifyID"}
								/>
							</div>
						))}

						<div className="form-group form-check mb-3">
							<input type="checkbox" className="form-check-input" id="updateCheck" />
							<label className="form-check-label mb-3" htmlFor="updateCheck">
								Notify me about updates
							</label>
						</div>
						<button type="submit" className="btn btn-primary dark-button">
							Sign Up
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default Signup;
