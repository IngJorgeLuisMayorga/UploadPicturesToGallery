const wait = require('./lib/wait');
const getImprintsBySku = require('./lib/imprints');
const downloadFile = require('./lib/download');
const compressFile = require('./lib/compress');
const uploadFile = require('./lib/upload');
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

        // For Each Category
        const category = 'sante';
        console.log(' ');
        console.log('CATEGORY => '+category);
        console.log(' ');

        

        // skus  for HULTS
        const skus_papeterie = ["8713159252603","8713159270829","8713159173953","8713159182351","8713159256854","8713159348894","8713159350217","8713159353690","8713159353669","8713159114857","8713159308270","8713159369615","8713159348122","8713159252764","8713159299059","8713159272717","8713159347859","8713159352013","8713159265801","8713159275206","8713159353676","8713159216179","8713159242468","8713159353720","8713159252603","8713159270829","8713159173953","8713159182351","8713159256854","8713159348894","8713159350217","8713159353690","8713159353669","8713159114857","8713159308270","8713159369615","8713159348122","8713159252764","8713159299059","8713159272717","8713159347859","8713159352013","8713159265801","8713159275206","8713159353676","8713159216179","8713159242468","8713159353720"]
        const skus = skus_papeterie;

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

                } catch( error ){

                }

                console.log(`CATEGORY ${category} SKU ${sku} Image ${imprints[i].image}  i ${i}/${imprints.length}`);
            }
        }


})();
