const wait = require('./lib/wait');
const getImprintsBySku = require('./lib/imprints');
const downloadFile = require('./lib/download');
const compressFile = require('./lib/compress');
const uploadFile = require('./lib/upload');
const fs = require('fs');
var express = require('express');
var app = express();



app.route('/compress-picture-to-gcloud').get(function(req,res)
{

    (async () => {

 
        // For Each Category
        const category = 'all';
        console.log(' ');
        console.log('CATEGORY => '+category);
        console.log(' ');

     
        // skus 
        const skus = [ ... req.skus ];

        // For Each Pages SKUS
        const N = skus.length;
        for(let s = 0; s < N ; s++){
            const sku = skus[s];
            let imprints = [];
            try{
                imprints = await getImprintsBySku(sku);
            } catch( error ){
                console.error({error})
            }

            if(imprints){
                for(let i = 0; i < imprints.length ; i++){
                
                    try{
                        const filename = await downloadFile(imprints[i].image);
                        const compress = await compressFile(filename);
                        const upload = await uploadFile(filename);

                    } catch( error ){
                            console.error({error})
                    }

                    console.log(`CATEGORY ${category} SKU ${sku} / ${skus.length} Image ${imprints[i].image}  i ${i}/${imprints.length}`);
                }
            }
        }

        res.send("OK");


    })();

   
});


