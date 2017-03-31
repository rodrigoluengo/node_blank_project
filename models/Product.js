let mongoose = require('mongoose');
let ProductSchema = require('../schemas/ProductSchema');
let Product = mongoose.model('Product', ProductSchema);


// Verify if name exists
Product.schema.path('name').validate(function(value, next)
{
    Product.findOne({name: {$regex : new RegExp(this.name, "i")}, owner: this.owner, section: this.section}).then(product => {
        next(!product);
    });

}, 'Já existe um Produto com este nome');

module.exports = Product;