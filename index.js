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
        const category = 'jeux';
        console.log(' ');
        console.log('CATEGORY => '+category);
        console.log(' ');

        

        // skus  for HULTS
        const skus_papeterie = ["8713159280064","8713159120124","8713159244080","8713159145912","8713159244097","8713159256786","8713159253433","8713159044123","8713159040163","8713159256823","8713159245285","8713159245339","8713159115984","8713159043935","8713159279884","8713159279969","8713159112518","8713159115649","8713159118336","8713159321897","8713159279587","8713159245247","8713159239079","8713159348009","8713159280064","8713159120124","8713159244080","8713159145912","8713159244097","8713159256786","8713159253433","8713159044123","8713159040163","8713159256823","8713159245285","8713159245339","8713159115984","8713159043935","8713159279884","8713159279969","8713159112518","8713159115649","8713159118336","8713159321897","8713159279587","8713159245247","8713159239079","8713159348009","8713159280064","8713159120124","8713159244080","8713159145912","8713159244097","8713159256786","8713159253433","8713159044123","8713159040163","8713159256823","8713159245285","8713159245339","8713159115984","8713159043935","8713159279884","8713159279969","8713159112518","8713159115649","8713159118336","8713159321897","8713159279587","8713159245247","8713159239079","8713159348009"]
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
