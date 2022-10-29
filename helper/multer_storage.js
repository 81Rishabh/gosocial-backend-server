// multer file uploads
 const multer = require('multer');
 const path = require('path');

const getStorage = function(PATH) {
   return multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, path.join(__dirname, '..' , PATH));
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          cb(null, file.fieldname + '-' + uniqueSuffix)
        }
      });
 }


 module.exports = getStorage;

