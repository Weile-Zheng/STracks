const { playlist_track_all } = require('./NeteaseCloudMusicApi')
const fs = require('fs');

/**
 * Fetches all tracks from a netease playlist
 * @param {string} playlistID  netease playlist id
 * @returns dictionary of song name to artist name. 
 */
async function fetchPlaylistTracks(playlistID) {
  try {
    const result = await playlist_track_all({
      id: playlistID
    })
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
 * Write a dictionary to a file
 * @param {*} playlist 
 */
function writeDictToFile(dict) {
  fs.writeFile("./songs.txt", Object.entries(dict)
    .map(([key, value]) => `${key}: ${value}`).join('\n'), err => {
      if (err) throw err
      console.log("Output saved to file")
    })
}

async function main() {
  const dict = await fetchPlaylistTracks("2065854146")
  writeDictToFile(dict)
}

main()