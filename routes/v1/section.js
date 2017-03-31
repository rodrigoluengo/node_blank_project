let router            = Router();
let SectionController = require('../../controllers/v1/SectionController');


/**
 * GET
 * /v1/section
 */
router.get('/', Authenticated, SectionController.search);


/**
 * GET
 * /v1/section/:id
 */
router.get('/:id', Authenticated, SectionController.get);


/**
 * POST
 * /v1/section
 */
router.post('/', Authenticated, SectionController.post);


/**
 * PUT
 * /v1/section/:id
 */
router.put('/:id', Authenticated, SectionController.put);


/**
 * DELETE
 * /v1/section/:id
 */
router.delete('/:id', Authenticated, SectionController.delete);


module.exports = router;
