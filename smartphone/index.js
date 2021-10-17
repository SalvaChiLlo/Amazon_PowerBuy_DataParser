const fs = require('fs');

function parse() {
  const files = fs.readdirSync('./smartphone/')

  const products = []
  files.forEach(file => {
    if (file !== 'index.js') {
      let data = fs.readFileSync('./smartphone/' + file)
      data = JSON.parse(data)
      data.type = "SMARTPHONE"
      data.price = +data?.price?.replace('€', '').replace(',', '.').trim().trim().trim().trim().trim()
      products.push(data);
    }
  })

  fs.writeFileSync('./SMARTPHONESProducts.json', JSON.stringify(products))
  console.log('DATA GENERATED')
  return products;
}

module.exports = parse();