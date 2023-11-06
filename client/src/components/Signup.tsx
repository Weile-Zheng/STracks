/**************************************************
 * Signup PAGE component.
 *
 * This component displays a signup form with
 * cooresponding input boxes and titles.
 **************************************************/

const Signup = () => {
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		fetch("http://localhost:4000/test")
			.then((response) => response.text()) // convert the response to text
			.then((data) => console.log(data)) // log the response data
			.catch((error) => console.error("Error:", error)); // log any errors
	};

	const formFields = [
		{ id: "inputName", type: "text", placeholder: "Name", label: "Name" },
		{ id: "inputEmail", type: "email", placeholder: "Email", label: "Email" },
		{
			id: "inputSpotifyId",
			type: "text",
			placeholder: "SpotifyID",
			label: "SpotifyID",
		},
	];

	return (
		<div className="container bg-dark text-white py-5" id="SignupPage">
			<h1>Sign Up</h1>
			<p>
				The application is currently in production. Spotify Developer Platform
				Allows only a certain number of accounts to be authorized and tested for
				SpotTrack, please sign up below
			</p>
			<small>
				*If your signup was already approved, you can continue to login with
				Spotify authentication
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
						/>
					</div>
				))}

				<div className="form-group form-check mb-3">
					<input
						type="checkbox"
						className="form-check-input"
						id="updateCheck"
					/>
					<label className="form-check-label mb-3" htmlFor="updateCheck">
						Notify me about updates
					</label>
				</div>
				<button type="submit" className="btn btn-primary dark-button">
					Sign Up
				</button>
			</form>
		</div>
	);
};

export default Signup;
