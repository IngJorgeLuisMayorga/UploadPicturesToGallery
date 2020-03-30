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
        const category = 'bureau';
        console.log(' ');
        console.log('CATEGORY => '+category);
        console.log(' ');

        

        // skus  for HULTS
        const skus_papeterie = ["8713159232476","8713159046325","8713159020035","8713159048374","8713159046370","8713159049012","8713159046356","8713159270720","8713159270706","8713159114789","8713159152873","8713159046349","8713159049005","8713159152880","8713159342243","8713159137863","8713159154761","8713159149095","8713159353355","8713159355151","8713159232476","8713159046325","8713159020035","8713159048374","8713159046370","8713159049012","8713159046356","8713159270720","8713159270706","8713159114789","8713159152873","8713159046349","8713159049005","8713159152880","8713159342243","8713159137863","8713159154761","8713159149095","8713159353355","8713159355151"]
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
