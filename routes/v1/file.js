let router          = Router();
let FileController  = require('../../controllers/v1/FileController');
let UploadedFile    = require('../../middlewares/UploadedFile');
let StorageFile     = require('../../middlewares/StorageFile');



/**
 * POST
 * /v1/file
 */
router.post('/', Authenticated, UploadedFile, StorageFile, FileController.post);


/**
 * DELETE
 * /v1/delete/:id
 */
router.delete('/:id', Authenticated, FileController.delete);


module.exports = router;
