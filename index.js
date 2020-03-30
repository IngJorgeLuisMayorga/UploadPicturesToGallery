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
        const category = 'putas sombrillas';
        console.log(' ');
        console.log('CATEGORY => '+category);
        console.log(' ');

        

        // skus  for HULTS
        const skus_papeterie = ["8713159139386","8713159045366","8713159244523","8713159180807","8713159232704","8713159269236","8713159280484","8713159268512","8713159280309","8713159349037","8713159349204","8713159149408","8713159244417","8713159180319","8713159117834","8713159245087","8713159244615","8713159300519","8713159349259","8713159349167","8713159048633","8713159048671","8713159149347","8713159244554","8713159139386","8713159045366","8713159244523","8713159180807","8713159232704","8713159269236","8713159280484","8713159268512","8713159280309","8713159349037","8713159349204","8713159149408","8713159244417","8713159180319","8713159117834","8713159245087","8713159244615","8713159300519","8713159349259","8713159349167","8713159048633","8713159048671","8713159149347","8713159244554","8713159139386","8713159045366","8713159244523","8713159180807","8713159232704","8713159269236","8713159280484","8713159268512","8713159280309","8713159349037","8713159349204","8713159149408","8713159244417","8713159180319","8713159117834","8713159245087","8713159244615","8713159300519","8713159349259","8713159349167","8713159048633","8713159048671","8713159149347","8713159244554"]
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
