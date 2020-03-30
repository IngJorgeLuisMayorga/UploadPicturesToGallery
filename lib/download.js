const base = 'http://images.pfconcept.com/CoordinateImages_All/PNG/2400/';
const download = require('image-downloader')
const fs = require('fs');

function downloadFile(file) {
  return new Promise(async (resolve, reject) => {
    try {
      const url = '' + base + '' + file.replace('.jpg', '.png');
      const target = 'images/' + file.replace('.jpg', '.png');

      const options = {
        url: url,
        dest: target
      };

      console.log(' ');
      console.log({ url: url });
      console.log(' ');

      fs.readdir('images/', async (err, files) => {
        const fileToDownload = file.replace('.jpg', '.png');
        const filesInFolder = files;

        if (!filesInFolder.includes(fileToDownload)) {
          try {
            const { filename, image } = await download.image(options);
            console.log(filename); // => /path/to/dest/image.jpg
            resolve(filename);
          } catch (errorDown) {
            console.log('ERROR DOWNLOADING');
            reject('ERROR DOWNLAODING');
          }
        } else {
          console.log('ERROR REPEATED PICTURE');
          reject('ERROR REPEATED PICTURE');
        }
      });
    } catch (error) {
      console.error(' [ERROR] DOWNLOAD FILE ');
      console.error(error);
      reject(error);
    }
  });
}

module.exports = downloadFile;
