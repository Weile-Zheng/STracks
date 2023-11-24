const Tutorial = () => {
	return (
		<div id="Tutorial">
			<ol>
				<li>
					Login to your account if needed. (Note that currently only public playlist can be
					migrated. Change your playlist to public and change it back to private after migration)
				</li>
				<li>Find the desired playlist</li>
				<img src="github/netease.png" alt="netease" />
				<li>Copy the playlist ID from url</li>
				<img src="github/netease_id.png" alt="netease playlist id" />
				<li>Input relevant information and select matching level.</li>
				<img src="github/netease_migrate.png" alt="netease migrate" />
				<li>Get the result</li>
				<img src="github/netease_result_spotify.png" alt="netease result spotify" />
			</ol>
		</div>
	);
};

export default Tutorial;
