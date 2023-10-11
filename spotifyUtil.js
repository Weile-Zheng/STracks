const fs = require('fs');

/**
 * Gets the value of a key from a JSON file.
 * If no keys, returns the entire parsed JSON object.
 * @param {string} fileName - The name of the JSON file to read.
 * @param {string} [key] - The key to retrieve the value for.
 * @returns {Promise} A promise that resolves with the value of the key
 */
async function getKeys(fileName, key) {
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
 * @returns {Object} JSON object from spotify with access_token, token_type, expires_in.    
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
    return returndata;
}

async function main() {
    const client_id = await getKeys('keys.json', 'client_id');
    console.log(client_id);
    const client_secret = await getKeys('keys.json', 'client_secret');
    console.log(client_secret);
    const returndata = await getAccessToken(client_id, client_secret);
    console.log(returndata);
    console.log(typeof (returndata));
}

main();