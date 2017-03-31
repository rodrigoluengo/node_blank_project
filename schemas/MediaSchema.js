let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let createdAt = require('../resources/schemas/createdAt');
let updatedAt = require('../resources/schemas/updatedAt');

let MediaSchema = new Schema({
    owner: {
        required: [true, 'Informe o Usuário'],
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        required: [true, 'Informe o Tipo'],
        enum: {values: ['IMG', 'VID'], message: 'Informe um Tipo válido'}
    },
    url: {
        type: String,
        maxlength: [400, 'URL deve ter no máximo 400 caracteres'],
        validate: [{
            validator: function(val) {
                return val && !val.isBlank();
            },
            message: 'Informe a URL'
        }, {
            validator: function(val) {
                return val && val.isURL();
            },
            message: 'Informe uma URL válida'
        }]
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
    position: {
        type: Number,
        min: 0
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
MediaSchema.pre('save', createdAt);
MediaSchema.pre('update', updatedAt);

module.exports = MediaSchema;