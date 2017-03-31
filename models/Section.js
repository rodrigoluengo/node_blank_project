let mongoose = require('mongoose');
let SectionSchema = require('../schemas/SectionSchema');
let Section = mongoose.model('Section', SectionSchema);


// Verify if name exists
Section.schema.path('name').validate(function(value, next)
{
    Section.findOne({name: {$regex : new RegExp(this.name, "i")}, owner: this.owner, section: this.section}).then(section => {
        next(!section);
    });

}, 'Já existe um Departamento com este nome');

module.exports = Section;