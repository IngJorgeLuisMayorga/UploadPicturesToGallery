
const fs = require('fs');
const fetch = require('node-fetch');

const getProductURL = (sku) => `https://ioedeveloper.com/api/shop/catalog/products/${sku}?origin=https://sourcingforce.ioedeveloper.com`

function asyncFetchSku(url){
    return new Promise(async (resolve, reject) => {
        try {
        const response = await fetch(url);
        const data = await response.json();
        resolve(data);
        } catch( error ) {
            reject(error)
        }
    })
}

(async () => {
    
    const skus = require('./skus.json');
    const products = require('./products.json');
    for(let k = 0; k < skus.length; k++){
        console.log(k)
        try {
            const sku = skus[k];
            const url = getProductURL(sku);
            const productRaw = (await asyncFetchSku(url)).imprints.map( imprint => { return { sku: sku, printCode: imprint.printCode }});
            const product = [].concat(...([].concat(...productRaw)));
            products.push(product);
            fs.writeFileSync('products.json', JSON.stringify(products));
        } catch(error) {
            console.log(error)
        }
    }
})();