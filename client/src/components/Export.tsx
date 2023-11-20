import { useState, useRef } from "react";
import { Card, Form, Button, OverlayTrigger, Tooltip, Toast } from "react-bootstrap";
import { createPlaylist, find_all_matching_spotify_tracks, insertTracks } from "../scripts/spotifyUtil.js";

import { fetchPlaylistTracks } from "../scripts/fetchNetease.js";

/**************************************************************************
 * Export FEATURE Component
 *
 * PARENT: Home.tsx
 * Context Modify: None
 *
 * This component is added to the Home component after user login to
 * provide functionalities of exporting playlists from netease music to
 * spotify.
 **************************************************************************/

/**
 * As a feature component, export is not included in the context provider to reduce
 * boilerplate code and encapsulate unnecessary data provided by authContext, thus
 * Export take in accessToken naturally from its parent component <Home>.
 */

interface Props {
	userID: string;
	accessToken: string;
}

function Export({ userID, accessToken }: Props) {
	/***************************************************************************************
	 * open: Tracks the state for collapse object. (If Start Export is clicked open)
	 * formKey: set key to rerender the form after submission. Clearing all fields.
	 * showToast: Toast popup message for the progress and result of playlist exportation
	 * toastMessage: Live, console-like display of the export process.
	 * toastConsole: Persistant string variable for what toastMessage should be displaying.
	 *
	 * *The naming for toastMessage and toastConsole is kind of odd, they should be switched
	 * around, name refactoring in the future is needed.
	 *
	 * -----------To-be-provided by user in Start Export Form --------------
	 * neteasePlaylistID: Tracks the ID for netease playlist to-be-exported
	 * newPlaylistName: Tracks the playlist name for the newly created spotify playlist
	 * isPublicPlaylist: Tracks the publicity for the newly created spotify playlist
	 * playlistDescription: Tracks the playlist description.
	 * matchingLevel: The matching level for searching spotify track same/similar to netease
	 *
	 **************************************************************************************/
	const [open, setOpen] = useState(false);
	const [formKey, setFormKey] = useState(0);
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState("");
	const toastConsole = useRef("");

	const updateToastConsole = (newMessage: string) => {
		// This logs to javascript console
		console.log(newMessage);
		// This log to the toast console
		toastConsole.current = toastConsole.current + newMessage + "------------->";
		setToastMessage(toastConsole.current);
	};

	const [neteasePlaylistID, setNeteasePlaylistId] = useState("");
	const [newPlaylistName, setNewPlaylistName] = useState("");
	const [isPublicPlaylist, setIsPublicPlaylist] = useState(false);
	const [playlistDescription, setPlaylistDescription] = useState("");
	const [matchingLevel, setMatchingLevel] = useState("");
	// -------------------------------
	// Core of the program. Migrate the playlist from netease to spotify after Start Export
	// Form is submitted.
	// For detailed function description, see spotifyUtil and fetchNetease in scripts
	// -------------------------------
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setShowToast(true);
		toastConsole.current = ""; //Clear the console for every submission.

		// Resetting Form Values for field clearing.
		setNeteasePlaylistId("");
		setNewPlaylistName("");
		setIsPublicPlaylist(false);
		setPlaylistDescription("");
		setMatchingLevel("");
		setFormKey(formKey + 1);

		updateToastConsole(`Fetching tracks from netease playlist. ID: ${neteasePlaylistID}`);
		const trackList = await fetchPlaylistTracks(neteasePlaylistID);
		updateToastConsole("Track list from netease formed.");
		updateToastConsole("Finding all matching spotified tracks.");
		const [result, spotify_list] = await find_all_matching_spotify_tracks(
			trackList,
			accessToken,
			matchingLevel
		);
		updateToastConsole("Spotify track list formed");
		updateToastConsole("Inserting all tracks ");
		const playlist = await createPlaylist(
			newPlaylistName,
			accessToken,
			userID,
			playlistDescription,
			isPublicPlaylist
		);
		await insertTracks(spotify_list, playlist.id, accessToken);
		updateToastConsole(`Playlist migrated successfully. Matching Level: ${matchingLevel}`);
		updateToastConsole(result);
		updateToastConsole(`New Playlist Name: ${newPlaylistName}`);
	};

	/****************************************************
	 * react-bootstrap css.
	 * Input boxes:
	 *    neteasePlaylistID: REQUIRED
	 *    newPlaylistName:  REQUIRED
	 *    playlistDescription: OPTIONAL
	 *
	 * Multiple Choice:
	 *    matchingLevel: REQUIRED
	 *
	 * Check boxes:
	 *    isPublicPlaylist: OPTIONAL (default private)
	 *****************************************************/
	return (
		<div
			style={{
				display: "flex",
				width: "100%",
				margin: "10px",
			}}
		>
			<Card
				className="mb-3"
				style={{
					cursor: "pointer",
					backgroundColor: "rgba(0, 0, 0, 0)",
					color: "white",
					border: "1px solid",
					width: "20%",
					height: "80%",
					transition: "transform 0.3s ease-in-out",
					marginLeft: open ? "20%" : "40%",
					transform: open ? "translateX(-200px)" : "translateX(0)",
					justifyContent: "center",
				}}
				onClick={() => setOpen(!open)}
			>
				<Card.Body>
					<Card.Title>Start Export</Card.Title>
				</Card.Body>
			</Card>

			<div
				style={{ display: "flex", justifyContent: "space-between" }}
				className={`collapse-css-transition ${open ? "open" : ""}`}
			>
				<Form key={formKey} onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Label>Netease Playlist ID</Form.Label>
						<Form.Control
							type="text"
							value={neteasePlaylistID}
							onChange={(e) => setNeteasePlaylistId(e.target.value)}
							placeholder="Enter playlist ID"
							required
						/>
						<Form.Label>New Spotify Playlist Name</Form.Label>
						<Form.Control
							type="text"
							value={newPlaylistName}
							onChange={(e) => setNewPlaylistName(e.target.value)}
							placeholder="Enter new playlist name"
							required
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Set Matching Level</Form.Label>
						<OverlayTrigger
							placement="right"
							overlay={
								<Tooltip id="button-tooltip">
									1 - match tracks with same name and artists if provided. 2 - match tracks
									with same name and incomplete artists(ex: only one of two artist). 3 -
									match tracks with same name and different artist.
								</Tooltip>
							}
						>
							<Button
								variant="dark"
								style={{
									marginLeft: "10px",
									fontSize: "10px",
									borderRadius: "50%",
									padding: "2px 6px",
								}}
							>
								&#x2754;
							</Button>
						</OverlayTrigger>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<Form.Check
								type="radio"
								label="Level 1"
								name="matchingLevel"
								value="1"
								onChange={(e) => setMatchingLevel(e.target.value)}
								style={{ marginRight: "10px" }}
								required
							/>
							<Form.Check
								type="radio"
								label="Level 2"
								name="matchingLevel"
								value="2"
								onChange={(e) => setMatchingLevel(e.target.value)}
								style={{ marginRight: "10px" }}
							/>
							<Form.Check
								type="radio"
								label="Level 3"
								name="matchingLevel"
								value="3"
								onChange={(e) => setMatchingLevel(e.target.value)}
							/>
						</div>
					</Form.Group>
					<Form.Check
						type="checkbox"
						label="Make Public"
						name="makePublic"
						value="public"
						onChange={(e) => setIsPublicPlaylist(e.target.checked)}
					/>
					<Button variant="dark" type="submit">
						Submit
					</Button>
				</Form>
				<Form.Group controlId="description" style={{ marginLeft: "20px" }}>
					<Form.Label>Description</Form.Label>
					<Form.Control
						as="textarea"
						rows={3}
						value={playlistDescription}
						placeholder="Netease Imported Playlist"
						onChange={(e) => setPlaylistDescription(e.target.value)}
					/>
				</Form.Group>
			</div>
			<Toast
				onClose={() => setShowToast(false)}
				show={showToast}
				bg="dark"
				style={{
					position: "absolute",
					bottom: 0,
					right: 0,
					height: "500px",
					width: "300px",
					margin: "10px",
					overflow: "auto",
				}}
			>
				<Toast.Header closeButton={true} className="bg-dark text-light">
					<strong className="mr-auto">Status</strong>
				</Toast.Header>
				<Toast.Body className="bg-dark text-light">{toastMessage}</Toast.Body>
			</Toast>
		</div>
	);
}

export default Export;
