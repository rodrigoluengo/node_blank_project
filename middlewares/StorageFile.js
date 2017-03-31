let fs        = require('fs');
let path      = require('path');
let env       = require('../config/env');
let pkgcloud  = require('pkgcloud');
let storage   = pkgcloud.storage.createClient(env.get('storage'));
let async     = require('async');

let StorageFile = (req, res, next) =>
{
  req.storageFiles = [];

  // Upload Files to Storage Cloud
  let uploadStorageFiles = () =>
  {
    async.filter(req.uploadedFiles, (file, callback) =>
    {
      let name = path.basename(file.path).split('_')[1] + path.extname(file.name);
      let readStream = fs.createReadStream(file.path);
      let writeStream = storage.upload({
        container: req.user.getOwner()._id,
        remote: name
      });


      writeStream.on('error', err =>
      {
        callback(err);
      });


      writeStream.on('success', file =>
      {
        req.storageFiles.push(file);
        callback();
      });


      readStream.pipe(writeStream);
    },

    err =>
    {
      next(err);
    });
  };

  // Create Container if not exists
  storage.getContainer(req.user.getOwner()._id, err =>
  {
    if(err)
    {
      storage.createContainer({name: req.user.getOwner()._id}, err =>
      {
        if(err)
        {
          next(err);
        }
        else uploadStorageFiles();
      });
    }
    else uploadStorageFiles();
  });







};


module.exports = StorageFile;
