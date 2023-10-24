import {
    redirectToAuthCodeFlow, getAccessToken,
    generateCodeVerifier, generateCodeChallenge
} from './oauth.js';

import {
    createPlaylist, searchTrack, fetchWebApi,
    find_all_matching_spotify_tracks, insertTracks, optimizedMatching
} from './spotifyUtil.js';

import { fetchPlaylistTracks } from './fetchNetease.js';

const clientId = "4c9d395af6dd467ab054393b3b189898";
const params = new URLSearchParams(window.location.search); // Current url query string
const code = params.get("code");

if (!code) {
    //add_log_in_button(clientId);
    add_log_in_listener(clientId);
} else {
    const access_token = await getAccessToken(clientId, code);
    console.log(access_token);
    const profile = await fetchProfile(access_token);
    document.getElementById("title-cover-container").remove();
    populateUI(profile);
    document.getElementById("profile").style.display="block";
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
    const container = document.querySelector(".cover-container"); // select top-level div
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
    inputContainer.appendChild(createPlaylistButton);
    container.appendChild(inputContainer);
}

function add_search_track_button(access_token) {
    const container = document.querySelector(".cover-container"); // select top-level div

    const inputContainer = document.createElement("div");
    const inputLabel = document.createElement("label");
    inputLabel.innerText = "Track Name: ";
    const inputBox = document.createElement("input");
    inputBox.type = "text";
    inputContainer.appendChild(inputLabel);
    inputContainer.appendChild(inputBox);

    const searchTrackButton = document.createElement("button");
    searchTrackButton.innerText = "Search Track";
    searchTrackButton.addEventListener("click", async () => {
        const trackName = inputBox.value;
        if (trackName === "") {
            alert("Track name cannot be empty.");
            return;
        }
        const trackList = await searchTrack(access_token, trackName);
        console.log(trackList)
    });
    inputContainer.appendChild(searchTrackButton);
    container.appendChild(inputContainer);
}

function add_migrate_button(access_token, userID) {
    const container = document.querySelector(".cover-container"); // select top-level div

    const inputContainer = document.createElement("div");
    const inputLabel = document.createElement("label");
    inputLabel.innerText = "Spotify PlaylistID: ";
    const inputBox = document.createElement("input");
    inputBox.type = "text";
    inputContainer.appendChild(inputLabel);
    inputContainer.appendChild(inputBox);

    const migrateButton = document.createElement("button");
    migrateButton.innerText = "Migrate Playlist";
    migrateButton.addEventListener("click", async () => {
        const playlistID = inputBox.value;
        if (playlistID === "") {
            alert("Playlist name cannot be empty.");
            return;
        }
        const playlistName = await getPlaylistName(access_token, playlistID);
        const trackList = await searchTracks(access_token, playlistName);
        const playlist = await createPlaylist(access_token, userID, playlistName);
        await addTracksToPlaylist(access_token, playlist.id, trackList);
        console.log("Playlist migrated successfully.");
    });

    inputContainer.appendChild(migrateButton);
    container.appendChild(inputContainer);
}

function add_log_in_listener(clientId) {
    const link = document.getElementById("log-in-button");
    link.addEventListener("click", async () => {
        redirectToAuthCodeFlow(clientId)
    });
  }

function add_log_in_button(clientId) {
    const container = document.createElement("div");
    const inputContainer = document.createElement("div");

    const creatLoginButton = document.createElement("button");
    creatLoginButton.innerText = "Log in";
    creatLoginButton.addEventListener("click", async () => {
        redirectToAuthCodeFlow(clientId)
    })
    container.appendChild(inputContainer);
    container.appendChild(creatLoginButton);
    document.body.appendChild(container);
}