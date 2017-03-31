let mongoose = require('mongoose');
let Person = mongoose.models['Person'];
let router = Router();


/**
 * GET
 * /v1/person
 * Get list Person
 * @return Array
 */
router.get('/', Authenticated, (req, res) =>
{
    Person.find({}).then(people =>
    {
        res.status(HttpStatus.OK).json(people);
    })
    .catch(err =>
    {
        res.status(HttpStatus.NOT_FOUND).json(err);
    });
});



/**
 * POST
 * /v1/person
 * Save a new Person
 * @return Object
 */
router.post('/', Authenticated, (req, res) =>
{
    let person = req.body;
    person.userCreatedAt = req.user;
    new Person(person).save().then(person =>
    {
        res.status(HttpStatus.CREATED).json(person);
    })
    .catch(err =>
    {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(err);
    });

});



module.exports = router;