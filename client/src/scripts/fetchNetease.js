/*********
 * Wrapper functions for fetching and parsing netease music tracks using the 
 * NETEASEMUSIC nodejs api
 * 
 */


/**
 * Fetches all tracks from a netease playlist. Requesting url. 
 * @param {string} playlistID  netease playlist id
 * @returns arrays of song name to artist name. 
 */
export async function fetchPlaylistTracks(playlistID) {

  console.log("Sending Request")
  const url = `http://localhost:3000/playlist/track/all?id=${playlistID}&realIP=116.25.146.177`
  const result = await fetch(url);
  const data = await result.json();

  console.log("Returning songs")
  return data.songs.map(song => ({
    name: song.name,
    artists: song.ar.map(artist => artist.name)
  }))
}

/**
 * Fetches all tracks from a netease playlist from local NodeJS
 * @param {string} playlistID  netease playlist id
 * @returns dictionary of song name to artist name. 
 */
async function fetchPlaylistTracks_local(playlistID) {
  try {
    console.log("getting result")
    const result = await playlist_track_all({
      id: playlistID
    })
    console.log("Getting songs")
    const song = result.body['songs']
    const songDict = {}
    song.forEach(obj => {
      songDict[obj.name] = obj.ar[0].name
    })
    return songDict

  } catch (error) {
    console.log(error)
  }
}

/**
 * Write a song dictionary to a file
 * @param {*} playlist 
 */
function writeDictToFile(dict) {
  fs.writeFile("./songs.txt", Object.entries(dict)
    .map(([key, value]) => `${key}: ${value}`).join('\n'), err => {
      if (err) throw err
      console.log("Output saved to file")
    })
}

/**
 * Log a song dictionary to console
 * @param {*} list 
 */
function logSongsToConsole(list) {
  list.forEach(song => {
    console.log(`${song.name}: ${song.artists.join(', ')}`);
  });
}

async function main() {
  console.log("Fetching start");
  const dict = await fetchPlaylistTracks("7919811796");
  console.log("fetching end");
  logSongsToConsole(dict);
}
