const api = 'https://ioedeveloper.com/api/storage/vurbis-gallery/folders/sourcingforce/upload?origin=https://sourcingforce.ioedeveloper.com';
const FormData = require('form-data');
const fs = require('fs');

function uploadFile(path) {
      return new Promise((resolve, reject) => {
        try{
            const file = 'compressed/'+path.replace('images/','');
            var form = new FormData();
            form.append('file', fs.createReadStream(file));
            form.submit(api, function(err, res) {
                if(err){
                    reject(err)
                }
                res.resume();
                console.log('UPLOAD OK')
                resolve();
            });
        } catch(error){
            console.log('')
            console.log('UPLOAD ERROR')
            console.log(error)
            console.log('')
            reject(error);
        }  
    })
}

module.exports = uploadFile;
