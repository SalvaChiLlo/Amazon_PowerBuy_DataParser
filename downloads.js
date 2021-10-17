const fs = require('fs')
const fetch = require('node-fetch')

async function download(url, dir) {
  console.log('Downloading');
  const response = await fetch(url);
  const buffer = await response.buffer();
  fs.writeFile(dir, buffer, (err) => {
    if (err) {
      return console.log(err)
    }
    console.log('finished downloading! ' + dir);
  })

}

module.exports = download