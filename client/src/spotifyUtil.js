/**
 * Wrapper for working with spotify web api
 */



export async function fetchWebApi(endpoint, request_method, access_token, body) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        method: request_method,
        body: JSON.stringify(body)
    });
    return await res.json();
}

/**
 * Gets the value of a key from a JSON file.
 * If no keys, returns the entire parsed JSON object.
 * @param {string} fileName - The name of the JSON file to read.
 * @param {string} key - The JSON file key to retrieve the value for.
 * @returns {Promise} A promise that resolves with the value of the key
 */
export async function getKeys(fileName, key) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8', (err, jsonString) => {
            if (err) {
                console.log("Error reading file from disk:", err);
                reject(err);
            }
            try {
                const values = JSON.parse(jsonString);
                if (key) {
                    resolve(values[key]);
                } else {
                    resolve(values);
                }
            } catch (err) {
                console.log('Error parsing JSON string:', err);
                reject(err);
            }
        });
    });
}

/**
 * Get the access token from spotify API providing developer client keys. 
 * @param {string} client_id 
 * @param {string} client_secret 
 * @returns {string} access_token. Edit return to return full JSON object 
 */
async function getAccessToken(client_id, client_secret) {
    const url = 'https://accounts.spotify.com/api/token';
    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    data.append('client_id', client_id);
    data.append('client_secret', client_secret);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    });

    const returndata = await response.json();
    return returndata.access_token;
}


/**
 * Search for a track on spotify. 
 * @param {string} trackname
 * @param {string} access_token 
 * @param {list} artist_list
 * @param {number} limit number of relevent result to be returned from search query. 
 * @returns {object} List of track names returned from search with artist(s)
 * [ 
 *  {name: '', artists: ['', '' ], id: '' }, 
 *  {name: '', artists: [''], id: '' } 
 *  ]
 */

export async function searchTrack(trackName, access_token, artist_list, limit = 3) {
    console.log(artist_list);
    const artists = artist_list.join(", ");
    const name = trackName;
    const url = `https://api.spotify.com/v1/search?q=track:${name}%20artist:${artists}&type=track&limit=${limit}`;
    console.log(url);
    console.log(`access token: ${access_token}`)

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });

    const data = await response.json();

    if (data && data.tracks && data.tracks.items) {
        return data.tracks.items.map(item => ({
            name: item.name,
            artists: item.artists.map(artist => artist.name),
            id: item.id
        }));
    } else {
        return [];
    }
}
/**
 * Find matching spotifyID track for each
 * @param {*} track_list list of dict(track name and artists lists),
 * @param {*} access_token 
 * @returns {list} list of spotify track ID that matched the find
 */
export async function find_all_matching_spotify_tracks(track_list, access_token) {
    let spotify_list = [];
    // For each of the track in track_list, search it with spotify, get the first result
    // and return its spotify id to add into spotify list.
    for (const track of track_list) {

        const song = await searchTrack(track.name, access_token, track.artists);
        console.log(song);
        console.log(song.length)
        if (song.length > 0) {
            const firstTrack = song[0];
            console.log(firstTrack);
            spotify_list.push(firstTrack.id);
            console.log(firstTrack.id);
        }
        else {
            console.log(`Cannot find matching track: ${track.name} by artists: ${track.artists.join(",")}`);
        }

    }

    return spotify_list;
}
/**
 * Create a playlist for a user
 * @param {string} name 
 * @param {string} access_token 
 * @param {string} user_id 
 * @param {string} description optional parameter for playlist description
 * @param {boolean} isPublic publicity of new spotify playlist. Default private
 * @returns {} playlist creation response. Use .id to get the playlist id from the response.
 */
export async function createPlaylist
    (name, access_token, user_id, description = "Netease Imported Playlist", is_public = false) {

    const url = `https://api.spotify.com/v1/users/${user_id}/playlists`;
    const playlist = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${access_token}`
        },
        body: `{
            "name": "${name}",
            "description": "${description}",
            "public": "${is_public}"
        }`

    })


    return playlist.json();
}

/**
 * Matching a netease track to spotify track
 * Process
 *  - 1. match tracks with same name and artists
 *  - 2. match tracks with same name and incomplete artists(ex: only one of two artist)
 *  - 3. match tracks with same name and different artist. first result returned
 *  - 4. match tracks with different name. first result returned
 * 
 * @param {map} trackDetail track provided with full detail. {name: "", artist: [] }
 * @returns track id of the matched spotify track
 */
async function matching(trackDetail) {

}

/**
 * Insert a list of tracks to a playlist given playlist id and track id
 * @param {*} trackList In spotify track id
 * @param {*} playlist_id In spotify track id
 */
export async function insertTracks(trackList, playlist_id, access_token) {
    // uris=spotify:track:trackid
    // uris is the parameter needed to add to a playlist
    // Seperate each uris with a comma to add a list of tracks
    const trackURIs = trackList.map(track => `spotify:track:${track}`);
    await fetchWebApi(
        `v1/playlists/${playlist_id}/tracks?uris=${trackURIs.join(',')}`,
        'POST',
        access_token
    );
}


async function main() {
    console.log("Getting Cliend ID");
    const client_id = await getKeys('keys.json', 'client_id');
    console.log(client_id);
    console.log("Getting Cliend_secret");
    const client_secret = await getKeys('keys.json', 'client_secret');
    console.log(client_secret);
    console.log("Getting Access Token");
    const access_token = await getAccessToken(client_id, client_secret);
    console.log(access_token);
    console.log("Getting Tracks")
    const returnedTrack = await searchTrack("Hello?", access_token, 3, ["adele"]);
    console.log(returnedTrack);
    console.log("Creating Playlist")
    const create = await createPlaylist("Test", access_token, "31udsopvquncrlokyfc3jp2yx5kq")
    console.log(create)

}