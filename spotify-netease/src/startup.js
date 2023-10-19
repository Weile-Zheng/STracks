import {redirectToAuthCodeFlow, getAccessToken, 
    generateCodeVerifier, generateCodeChallenge} from './oauth.js';


const clientId = "4c9d395af6dd467ab054393b3b189898";
const params = new URLSearchParams(window.location.search); // Current url query string
const code = params.get("code");

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const access_token = await getAccessToken(clientId, code);
    const profile = await fetchProfile(access_token);
    populateUI(profile);
    //const create = await createPlaylist("Test", access_token, clientId)
    //console.log(create)
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