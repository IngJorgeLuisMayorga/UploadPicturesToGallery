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
        const category = 'secuirte';
        console.log(' ');
        console.log('CATEGORY => '+category);
        console.log(' ');

        

        // skus  for HULTS
        const skus_papeterie = ["8713159101093","8713159100393","8713159103448","8713159128373","8713159109853","8713159198697","8713159214946","8713159122302","8713159163343","8713159249085","8713159124863","8713159165460","8713159259121","8713159332954","8713159369189","8713159364115","8713159192954","8713159237228","8713159365051","8713159238478","8713159308645","8713159170297","8713159142218","8713159165811","8713159101093","8713159100393","8713159103448","8713159128373","8713159109853","8713159198697","8713159214946","8713159122302","8713159163343","8713159249085","8713159124863","8713159165460","8713159259121","8713159332954","8713159369189","8713159364115","8713159192954","8713159237228","8713159365051","8713159238478","8713159308645","8713159170297","8713159142218","8713159165811"]
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
