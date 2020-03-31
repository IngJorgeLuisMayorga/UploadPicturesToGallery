const Jimp = require('jimp');

function compressFile(filename) {
    return new Promise( async(resolve, reject) => {
      try{
        const path = filename;
        const imgPath = 'compressed/'+filename.replace('images/','');
        
        const image = await Jimp.read(path);
        await image.resize(600, Jimp.AUTO);
        await image.quality(60);
        await image.writeAsync(imgPath);
        console.log('DONE ')
        resolve(filename);
      } catch(error){
        console.log({error})
        reject(error);
      }
    });
}

module.exports = compressFile;
