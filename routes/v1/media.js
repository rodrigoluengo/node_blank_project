let mongoose = require('mongoose');
let Media = mongoose.models['Media'];
let router = Router();
let formidable = require('formidable');


/**
 * GET
 * /v1/media
 * Get list Media
 * @return Array
 */
router.get('/', Authenticated, (req, res) =>
{
    Media.find({}).then(medias =>
    {
        res.status(HttpStatus.OK).json(medias);
    })
    .catch(err =>
    {
        res.status(HttpStatus.NOT_FOUND).json(err);
    });
});



/**
 * POST
 * /v1/media
 * Save a new Media
 * @return Object
 */
router.post('/', /*Authenticated,*/ (req, res) =>
{
    /*let media = req.body;
    media.userCreatedAt = req.user;
    new Media(media).save().then(media =>
    {
        res.status(HttpStatus.CREATED).json(media);
    })
    .catch(err =>
    {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(err);
    });*/

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files)
    {
        //console.log(fields);
        //console.log(files);
        res.status(HttpStatus.OK).json({});
    });

});


module.exports = router;
