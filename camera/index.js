const fs = require('fs');
function parse() {

  const files = fs.readdirSync('./camera/')

  const products = []
  files.forEach(file => {
    if (file !== 'index.js') {
      let data = fs.readFileSync('./camera/' + file)
      data = JSON.parse(data)
      data.type = "CAMERA"
      data.price = +data?.price?.replace('€', '').replace(',', '.').trim().trim().trim().trim().trim()
      products.push(data);
    }
  })

  fs.writeFileSync('./CAMERAProducts.json', JSON.stringify(products))
  console.log('DATA GENERATED')
  return products
}

module.exports = parse();
