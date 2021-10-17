const fs = require('fs');
function parse() {

  const files = fs.readdirSync('./laptop/')

  const products = []
  files.forEach(file => {
    if (file !== 'index.js') {
      let data = fs.readFileSync('./laptop/' + file)
      data = JSON.parse(data)
      data.type = "LAPTOP"
      data.price = +data?.price?.replace('€', '').replace(',', '.').trim().trim().trim().trim().trim()
      products.push(data);
    }
  })

  fs.writeFileSync('./LAPTOPProducts.json', JSON.stringify(products))
  console.log('DATA GENERATED')
  return products;
}

module.exports = parse();
