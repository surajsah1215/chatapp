// Dependencies
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }).single('file');
// Middleware function for file upload
const fileupload = async(req, res, next)=>{
  upload(req, res, (error) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ msg: 'multer error while parsing', err: error });
     
    }
    else{
      console.log('file successfully parsed');
      next();
    }
  });
}

module.exports = {fileupload}
