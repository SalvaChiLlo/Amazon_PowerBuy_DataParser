const tv = require('./tv')
const laptop = require('./laptop')
const smartphone = require('./smartphone')
const camera = require('./camera');
const uploadFile = require('./UploadFile');
const download = require('./downloads');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs')

const categories = [tv, laptop, smartphone, camera];
const res = []

const DOWNLOAD = false;

async function main() {
  for (let prod = 0; prod < categories.length; prod++) {
    const products = categories[prod];
    for (let it = 0; it < products.length; it++) {
      const item = products[it];
      for (let img = 0; img < item.image?.length; img++) {
        const image = item.image[img];
        console.log(image)
        let fileName = image.split('/')
        fileName = /* uuidv4() + */ fileName[fileName.length - 1]
        const fileRoute = `./_images/${fileName}`
        if (DOWNLOAD) {
          await download(image, fileRoute);
        } else {
          console.log(fileRoute)
          const res = await uploadFile(fileRoute, item.type);
          console.log('https://drive.google.com/uc?id=' + res.data.id)
          item.image[img] = 'https://drive.google.com/uc?id=' + res.data.id
        }
      }
      res.push(item)
    }
  }
  console.log(res)
  fs.writeFileSync('./FINALL.json', JSON.stringify(res))
}

main();
