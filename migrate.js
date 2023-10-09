const { playlist_track_all } = require('./NeteaseCloudMusicApi')

let name

async function test() {
  try {
    const result = await playlist_track_all({
      id: '2065854146'
    })
    const song = result.body['songs']
    name = song.map(obj => obj.name)
    console.log(name)
  } catch (error) {
    console.log(error)
  }
}

test()