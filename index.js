const wait = require('./lib/wait');
const getImprintsBySku = require('./lib/imprints');
const downloadFile = require('./lib/download');
const compressFile = require('./lib/compress');
const uploadFile = require('./lib/upload');
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {

    const CATEGORIES_AWS_JLMAYORGACO = ['catalog/accessoires', 'catalog/art-de-la-table-et-de-la-maison', 'catalog/outils-et-lampes','catalog/papeterie', 'catalog/bureau',  'catalog/parapluies', 'catalog/jeux-et-jouets',
    'catalog/bouteilles', 'catalog/loisirs-et-golf'];
    const CATEGORIES_AWS_QSO_PROD = ['catalog/vestes', 'catalog/polaire','catalog/sécurité-&-premiers-soins', 'catalog/voyages-&-bagagerie',
    'catalog/voyages-&-bagagerie', 'catalog/stylos'];
    const CATEGORIES_AWS_PIT_PROD = ['catalog/montres', 'catalog/hauts','catalog/pulls-et-gilets'];
    const CATEGORIES_LOCAL = ['catalog/audio-&-vidéo', 'catalog/technologie',
    'catalog/pendules', 'catalog/primes',
    'catalog/santé-et-bien-être', 
    'catalog'];

    const categories = CATEGORIES_AWS_JLMAYORGACO;


    const INIT_TIME = 60000; // 60 sec
    const CATEGORY_BASE = 'http://localhost:4201/';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    console.log(' Initing ...., waiting chrome getting ready ')
    await wait(INIT_TIME);
    console.log(' Ready ')


    for (let c = 0; c < categories.length ; c++) {
        
        // For Each Category
        const category = categories[c];
        await page.goto( `${CATEGORY_BASE}${category}`);
        await wait(30000);
        console.log(' ');
        console.log('CATEGORY => '+category);
        console.log(' ');

        const nOfItemsQuery = `JSON.stringify(Math.max(...Array.from(document.querySelectorAll('span a')).map(i => parseInt(i.innerText, 10)).filter(i => !isNaN(i))))`;
        const noOfItemsAsString = await page.evaluate(nOfItemsQuery);
        const noOfString = JSON.parse(noOfItemsAsString);
        const pagesLength = parseInt(noOfString, 10);
        await wait(3500);
        console.log(' ');
        console.log('PAGES => '+pagesLength);
        console.log(' '); 

    
        for (let p = 0; p < pagesLength + 1 ; p++) {

            // For Each Page
            const skus = [];
            const queryAsString = `JSON.stringify(Array.from(document.getElementsByClassName("${'catalog-product-item'}")).map(el => el.id))`;
            const skusAsString = await page.evaluate(queryAsString);
            const skusAsArray = JSON.parse(skusAsString);
            skusAsArray.map(sku => skus.push(sku));
            await wait(3500); 
            console.log(' ');
            console.log('SKUS => '+JSON.stringify(skus));
            console.log(' ');


            //click next
            try{
                await page.$eval('.pagination-next', el => el.click());
            } catch( errorClickNext ){
                await page.screenshot({path: 'error.png'});
            }

            // For Each Pages SKUS
            const N = skus.length;
            for(let s = 0; s < N ; s++){
                const sku = skus[s];
                const imprints = await getImprintsBySku(sku);
                
                for(let i = 0; i < imprints.length ; i++){
               
                    try{
                        const filename = await downloadFile(imprints[i].image);
                        const compress = await compressFile(filename);
                        const upload = await uploadFile(filename);
                        console.log({filename})
                        process.exit(0)

                    } catch( error ){

                    }

                    console.log(`CATEGORY ${category} PAGE ${p} SKU ${sku} Image ${imprints[i].image}`);
                }
            }



        }

    }

    await browser.close();

})();
