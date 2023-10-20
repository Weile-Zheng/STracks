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
 * @param {number} limit number of relevent result to be returned from search query. 
 * @returns {object} List of track names returned from search with artist(s)
 * [ 
 *  {name: '', artists: ['', '' ], id: '' }, 
 *  {name: '', artists: [''], id: '' } 
 *  ]
 */
async function searchTrack(trackName, access_token, limit, artist_list) {
    const artists = artist_list.join(", ");
    console.log(artists);
    const url = `https://api.spotify.com/v1/search?q=track:${trackName}%20artist:${artists}&type=track&limit=${limit}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });
    const data = await response.json();
    return data.tracks.items.map(item => ({
        name: item.name,
        artists: item.artists.map(artist => artist.name),
        id: item.id
    }));

}


/**
 * Create a playlist for a user
 * @param {string} name 
 * @param {string} access_token 
 * @param {string} user_id 
 * @param {string} description optional parameter for playlist description
 * @param {boolean} isPublic publicity of new spotify playlist. Default private
 * @returns {boolean} true if playlist was created successfully, false otherwise.
 */
export async function createPlaylist
    (name, access_token, user_id, description = "Netease Imported Playlist", is_public = false) {

    const url = `https://api.spotify.com/v1/users/${user_id}/playlists`;
    const response = await fetch(url, {
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
    return response.json();
}

/**
 * Insert a track into a playlist given playlist id and track id.
 * @param {string} playlist_id 
 * @param {string} track_id 
 * @param {string} userID spotify userid
 * @param {string} access_token 
 * @returns {boolean} true if track was inserted successfully, false otherwise.
 */
async function insert(playlist_id, track_id, userID, access_token) {

}


/**
 * Insert a list of tracks to a playlist given playlist id and track id
 * @param {*} trackList 
 * @param {*} track_id 
 * @param {*} userID 
 * @param {*} access_token 
 */
async function insertTracks(trackList, track_id, userID, access_token) {

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
