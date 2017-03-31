let async     = require('async');
let mongoose  = require('mongoose');
let File      = mongoose.models['File'];
let pkgcloud  = require('pkgcloud');
let storage   = pkgcloud.storage.createClient(env.get('storage'));

class FileController
{


  /**
   * Storage Files
   * @param req
   * @param res
   */
  static post(req, res)
  {
    let files = [];
    async.filter(req.storageFiles, (storageFile, callback) =>
    {
      new File({
        owner: req.user.getOwner()._id,
        name: storageFile.name,
        contentType: storageFile.contentType,
        size: storageFile.size,
        userCreatedAt: req.user._id
      })
      .save().then(file =>
      {
        files.push(file);
        callback();
      })
      .catch(err =>
      {
        callback(err);
      });

    },
    err =>
    {
      if(err)
      {
        // Remove Stored Files
        req.storageFiles.forEach(storageFile =>
        {
          storage.removeFile(req.user.getOwner()._id, storageFile.name, (err, result) =>
          {

          });
        });

        // Remove File on Data Base
        files.forEach(file =>
        {
          file.remove();
        });

        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(err);
      }
      else
        res.status(HttpStatus.CREATED).json(files);
    });

  }


  /**
   * Delete a File
   * @param req
   * @param res
   */
  static delete(req, res)
  {
    File.findOne({owner: req.user.getOwner()._id, _id: req.params['id']}).then(file =>
    {
      storage.removeFile(req.user.getOwner()._id, file.name, (err, result) =>
      {
        if(err)
        {
          res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(err);
        }
        else
        {
          res.status(HttpStatus.OK).json(result);
        }
      });

    }).catch(err =>
    {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(err);
    });
  }

}


module.exports = FileController;
