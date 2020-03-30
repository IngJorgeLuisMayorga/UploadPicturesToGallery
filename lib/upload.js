const api = 'https://ioedeveloper.com/api/storage/vurbis-gallery/folders/sourcingforce/upload?origin=https://sourcingforce.ioedeveloper.com';

function uploadFile(path) {
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

module.exports = uploadFile;
