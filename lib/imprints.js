const  request = require('request');
const apiProductBySKU = function(sku) { return 'https://ioedeveloper.com/api/shop/catalog/products/' + sku + '?origin=https://sourcingforce.ioedeveloper.com' };

function getImprintsBySku(sku) {
    return new Promise((resolve, reject) => {
        request(apiProductBySKU(sku), function(err, response, body) {
            
            if(!err && !body.includes('Bad Gateway') && !body.includes('Not Found')){
                //console.log({sku, url :apiProductBySKU(sku), body})
                resolve(JSON.parse(body).imprints)
            } else {
                reject(err)
            }
        });
    })
}

module.exports = getImprintsBySku;
