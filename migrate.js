const { playlist_track_all } = require('./NeteaseCloudMusicApi')
  
const fs = require('fs');

let name

async function test() {
  try {
    const result = await playlist_track_all({
      id: '2065854146'
    })
    const song = result.body['songs']
    name = JSON.stringify(song)

    fs.writeFile("./songs.json", name, err=>{
      if(err){
        console.log("Error writing file" ,err)
      } else {
        console.log('JSON data is written to the file successfully')
      }
     })
     
  } catch (error) {
    console.log(error)
  }
}

test()