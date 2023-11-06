const Signup = () => {
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// handle form submission logic here
	};

	return (
		<div className="container bg-dark text-white py-5" id="SignupPage">
			<h1>Sign Up</h1>
			<p>
				The application is currently in production. Spotify Developer Platform
				Allows only a certain number of accounts to be authorized and tested for
				SpotTrack, please sign up below
			</p>
			<form onSubmit={handleSubmit}>
				<div className="form-group mb-3">
					<label htmlFor="inputName">Name</label>
					<input
						type="text"
						className="form-control"
						id="inputName"
						placeholder="Name"
					/>
				</div>
				<div className="form-group mb-3">
					<label htmlFor="inputEmail">Email</label>
					<input
						type="email"
						className="form-control"
						id="inputEmail"
						placeholder="Email"
					/>
				</div>
				<div className="form-group mb-3">
					<label htmlFor="inputSpotifyId">Spotify ID</label>
					<input
						type="text"
						className="form-control"
						id="inputSpotifyId"
						placeholder="Spotify ID"
					/>
				</div>
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
