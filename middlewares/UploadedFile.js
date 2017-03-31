let formidable  = require('formidable');


let UploadedFile = (req, res, next) =>
{
  let form = new formidable.IncomingForm();
  form.multiples = true;

  form.parse(req, (err, fields, files) =>
  {
    req.uploadedFiles = files.file instanceof Array ? files.file : [files.file];
    next();
  });
};


module.exports = UploadedFile;
