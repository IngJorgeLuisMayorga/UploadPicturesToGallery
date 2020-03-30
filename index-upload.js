
const { URLSearchParams } = require('url');
const fs = require('fs');
const fetch = require('node-fetch');
const FormData = require('form-data');


const api = 'https://ioedeveloper.com/api/storage/vurbis-gallery/folders/sourcingforce/upload?origin=https://sourcingforce.ioedeveloper.com';


async function upload(path){
    return new Promise((resolve, reject) => {
        try{
            var form = new FormData();
            form.append('file', fs.createReadStream(path));
            form.submit(api, function(err, res) {
                res.resume();
                resolve();
            });
        } catch(error){
            reject(error);
        }  
    })
}

//requiring path and fs modules
const path = require('path');
//joining path of directory 
const directoryPath = path.join(__dirname, 'compressed');
//passsing directoryPath and callback function
fs.readdir(directoryPath, async function (err, files) {

    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    fileLength = files.length;
    for(let k = 0;  k < fileLength; k++){

        const file = files[k];
        if(file.includes('png')){
            try{
            const isUpload = await upload("compressed/" + file);
            console.log(' PROCESSING .... ' + (100*(k)/(fileLength)))
            }catch(error){
                console.log('[ERROR] ')
                console.log({error})
            }
        }
    
    }

});

