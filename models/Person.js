let mongoose = require('mongoose');
let PersonSchema = require('../schemas/PersonSchema');
let Person = mongoose.model('Person', PersonSchema);


// Verify if name exists
/*Product.schema.path('name').validate(function(value, next)
{
    Product.findOne({name: {$regex : new RegExp(this.name, "i")}, owner: this.owner, section: this.section}).then(product => {
        next(!product);
    });

}, 'Já existe um Produto com este nome');*/

Person.schema.path('phones').validate(function(value, next) {


    next(true);
});

module.exports = Person;