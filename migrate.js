const { playlist_track_all } = require('./NeteaseCloudMusicApi')

const fs = require('fs');

let name

async function test() {
  try {
    const result = await playlist_track_all({
      id: '2065854146'
    })
    const song = result.body['songs']
    const songDict = {}
    song.forEach(obj => {
      songDict[obj.name] = obj.ar[0].name
    })

    fs.writeFile("./songs.txt", Object.entries(songDict).map(([key, value]) => `${key}: ${value}`).join('\n'), err => {
      if (err) throw err
      console.log("Output saved to file")
    })
  } catch (error) {
    console.log(error)
  }
}

test()