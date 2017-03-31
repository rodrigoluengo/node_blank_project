let mongoose  = require('mongoose');
let Schema    = mongoose.Schema;
let createdAt = require('../resources/schemas/createdAt');
let updatedAt = require('../resources/schemas/updatedAt');

let SectionSchema = new Schema({
    owner: {
        required: [true, 'Informe o Usuário'],
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    section: {
        type: Schema.Types.ObjectId,
        ref: 'Section'
    },
    type: {
      type: String,
      required: [true, 'Informe o Tipo'],
      enum: {values: ['EXP'], message: 'Informe um Tipo válido'}
    },
    name: {
        type: String,
        maxlength: [45, 'Nome deve ter no máximo 45 caracteres'],
        validate: {
            validator: function(val) {
                return val && !val.isBlank();
            },
            message: 'Informe o Nome'
        }
    },
    status: {
        type: String,
        required: [true, 'Informe o Status'],
        enum: {values: ['ACT', 'INA'], message: 'Informe um Status válido'}
    },
    detail: {
        type: String,
        maxlength: [4000, 'Descrição deve ter no máximo 4000 caracteres']
    },
    createdAt: Date,
    userCreatedAt: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedAt: Date,
    userUpdatedAt: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


// Created and Updated Date
SectionSchema.pre('save', createdAt);
SectionSchema.pre('update', updatedAt);

module.exports = SectionSchema;
