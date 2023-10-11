const { playlist_track_all } = require('./NeteaseCloudMusicApi')
const fs = require('fs');

async function fetchPlaylistTracks() {
  try {
    const result = await playlist_track_all({
      id: '2065854146'
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

function writeDictToFile(playlist) {
  fs.writeFile("./songs.txt", Object.entries(playlist)
    .map(([key, value]) => `${key}: ${value}`).join('\n'), err => {
      if (err) throw err
      console.log("Output saved to file")
    })
}

async function main() {
  const dict = await fetchPlaylistTracks()
  writeDictToFile(dict)
}

main()