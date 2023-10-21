
import {
    redirectToAuthCodeFlow, getAccessToken,
    generateCodeVerifier, generateCodeChallenge
} from './oauth.js';

import { createPlaylist, searchTrack, fetchWebApi, find_all_matching_spotify_tracks, insertTracks } from './spotifyUtil.js';

import { fetchPlaylistTracks } from './fetchNetease.js';

const clientId = "4c9d395af6dd467ab054393b3b189898";
const params = new URLSearchParams(window.location.search); // Current url query string
const code = params.get("code");

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const access_token = await getAccessToken(clientId, code);
    console.log(access_token);
    const profile = await fetchProfile(access_token);
    populateUI(profile);
    add_netease_playlist_button();
    add_search_track_button(access_token);
    add_migrate_button(access_token, profile.id);
}

/**
 * Fetch user spotify profile. 
 * @param {string} token 
 * @returns user profile in JSON 
 */
async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

/**
 * Populate web page with information on user profile.
 * @param {object} profile json profile 
 */
function populateUI(profile) {
    document.getElementById("displayName").innerText = profile.display_name;
    if (profile.images[0]) {
        const profileImage = new Image(200, 200);
        profileImage.src = profile.images[0].url;
        document.getElementById("avatar").appendChild(profileImage);
        document.getElementById("imgUrl").innerText = profile.images[0].url;
    }
    document.getElementById("id").innerText = profile.id;
    document.getElementById("email").innerText = profile.email;
    document.getElementById("uri").innerText = profile.uri;
    document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
    document.getElementById("url").innerText = profile.href;
    document.getElementById("url").setAttribute("href", profile.href);

}


function add_netease_playlist_button() {
    const container = document.createElement("div");

    const inputContainer = document.createElement("div");
    const inputLabel = document.createElement("label");
    inputLabel.innerText = "Netease PlaylistID: ";
    const inputBox = document.createElement("input");
    inputBox.type = "text";
    inputContainer.appendChild(inputLabel);
    inputContainer.appendChild(inputBox);

    const createPlaylistButton = document.createElement("button");
    createPlaylistButton.innerText = "Get Playlist Tracks";
    createPlaylistButton.addEventListener("click", async () => {
        const playlistID = inputBox.value;
        if (playlistID === "") {
            alert("Playlist name cannot be empty.");
            return;
        }
        const trackList = await fetchPlaylistTracks(playlistID);
        console.log(trackList)
    });

    container.appendChild(inputContainer);
    container.appendChild(createPlaylistButton);
    document.body.appendChild(container);
}

function add_search_track_button(access_token) {
    const container = document.createElement("div");

    const inputContainer = document.createElement("div");
    const inputLabel = document.createElement("label");
    inputLabel.innerText = "Track Name: ";
    const inputBox = document.createElement("input");
    inputBox.type = "text";
    inputContainer.appendChild(inputLabel);
    inputContainer.appendChild(inputBox);

    const createPlaylistButton = document.createElement("button");
    createPlaylistButton.innerText = "Search ";
    createPlaylistButton.addEventListener("click", async () => {
        const trackName = inputBox.value;
        if (trackName === "") {
            alert("Song name cannot be empty.");
            return;
        }
        const song = await searchTrack(trackName, access_token);
        console.log(song)
    });

    container.appendChild(inputContainer);
    container.appendChild(createPlaylistButton);
    document.body.appendChild(container);
}
function add_migrate_button(access_token, userID) {
    const container = document.createElement("div");

    const inputContainer = document.createElement("div");
    const inputLabel = document.createElement("label");
    inputLabel.innerText = "Netease PlaylistID: ";
    const inputBox = document.createElement("input");
    inputBox.type = "text";
    inputContainer.appendChild(inputLabel);
    inputContainer.appendChild(inputBox);

    const createPlaylistButton = document.createElement("button");
    createPlaylistButton.innerText = "Migrate Playlist";
    createPlaylistButton.addEventListener("click", async () => {
        const playlistID = inputBox.value;
        if (playlistID === "") {
            alert("Playlist ID cannot be empty.");
            return;
        }

        const playlist = await createPlaylist("exported playlist", access_token, userID);
        console.log("Forming tracklists")
        const trackList = await fetchPlaylistTracks(playlistID);
        console.log("Track list from netease formed. ");
        console.log("Finding all matching spotified tracks");
        const spotify_list = await find_all_matching_spotify_tracks(trackList, access_token);
        console.log("Spotify track list found");
        console.log(spotify_list);
        console.log("Inserting all tracks");
        await insertTracks(spotify_list, playlist.id, access_token);
        console.log("Complete");
    });

    container.appendChild(inputContainer);
    container.appendChild(createPlaylistButton);
    document.body.appendChild(container);
}
