let router          = Router();
let UserController  = require('../../controllers/v1/UserController');


/**
 * GET
 * /v1/user
 */
router.get('/', Authenticated, UserController.search);


/**
 * GET
 * /v1/user/:id
 */
router.get('/:id', Authenticated, UserController.get);


/**
 * POST
 * /v1/user
 */
router.post('/', UserController.post);


/**
 * PUT
 * /v1/user/:id
 */
router.put('/:id', Authenticated, UserController.put);


/**
 * DELETE
 * /v1/user/:id
 */
router.delete('/:id', Authenticated, UserController.delete);


/**
 * POST
 * /v1/user/credential
 */
router.post('/credential', UserController.credentials);


module.exports = router;
