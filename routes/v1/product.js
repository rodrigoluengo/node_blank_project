let router            = Router();
let ProductController = require('../../controllers/v1/ProductController');


/**
 * GET
 * /v1/product
 */
router.get('/', Authenticated, ProductController.search);


/**
 * GET
 * /v1/product/:id
 */
router.get('/:id', Authenticated, ProductController.get);


/**
 * POST
 * /v1/product
 */
router.post('/', Authenticated, ProductController.post);


/**
 * PUT
 * /v1/product
 */
router.put('/:id', Authenticated, ProductController.put);


/**
 * DELETE
 * /v1/product
 */
router.delete('/:id', Authenticated, ProductController.delete);


module.exports = router;
