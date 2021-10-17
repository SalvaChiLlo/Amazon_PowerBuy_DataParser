const fs = require('fs');

function parse() {
  const files = fs.readdirSync('./tv/')

  const products = []
  files.forEach(file => {
    if (file !== 'index.js') {
      let data = fs.readFileSync('./tv/' + file)
      data = JSON.parse(data)
      data.type = "TV"
      data.price = +data?.price?.replace('€', '').replace(',', '.').trim().trim().trim().trim().trim()
      products.push(data);
    }
  })

  fs.writeFileSync('./TVProducts.json', JSON.stringify(products))
  console.log('DATA GENERATED')
  return products;
}

module.exports = parse();