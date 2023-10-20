const { playlist_track_all } = require('./NeteaseCloudMusicApi')
const fs = require('fs');

/**
 * Fetches all tracks from a netease playlist
 * @param {string} playlistID  netease playlist id
 * @returns dictionary of song name to artist name. 
 */
async function fetchPlaylistTracks(playlistID) {
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
 * @param {*} dict 
 */
function logDictToConsole(dict){
  console.log(Object.entries(dict).map(([key,value])=>`${key}: ${value}`).join('\n'))
}

async function main() {
  console.log("Fetching start");
  const dict = await fetchPlaylistTracks("7919811796");
  console.log("fetching end");
  writeDictToFile(dict);
  logDictToConsole(dict);
}

main()