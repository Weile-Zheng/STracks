const Login = () => {
	return (
		<div
			id="title-cover-container"
			className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column align-items-center justify-content-center text-white"
			style={{
				position: "absolute",
				top: "55%",
				left: "50%",
				transform: "translate(-50%, -50%)",
			}}
		>
			<main role="main" className="inner cover text-center">
				<h1 className="cover-heading">Import your Playlist</h1>
				<p className="lead">
					Import your playlists from other music platforms to Spotify. Get
					started by logging into Spotify.
				</p>
				<p className="lead">
					<button
						type="button"
						className="btn btn-lg btn-light"
						id="log-in-button"
						style={{ fontWeight: "bold" }}
					>
						Log in
					</button>
				</p>
			</main>
		</div>
	);
};

export default Login;
