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
        const skus_papeterie = ["8713159254430","8713159146520","8713159145721","8713159156024","8713159179221","8713159179269","8713159202431","8713159216834","8713159216858","8713159216889","8713159132837","8713159230120","8713159349464","8713159349471","8713159230229","8713159230311","8713159230359","8713159242154","8713159241706","8713159118701","8713159119166","8713159044277","8713159321446","8713159321842","8713159254430","8713159146520","8713159145721","8713159156024","8713159179221","8713159179269","8713159202431","8713159216834","8713159216858","8713159216889","8713159132837","8713159230120","8713159349464","8713159349471","8713159230229","8713159230311","8713159230359","8713159242154","8713159241706","8713159118701","8713159119166","8713159044277","8713159321446","8713159321842"]
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
