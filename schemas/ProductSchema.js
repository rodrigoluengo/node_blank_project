let mongoose  = require('mongoose');
let Schema    = mongoose.Schema;
let createdAt = require('../resources/schemas/createdAt');
let updatedAt = require('../resources/schemas/updatedAt');

let ProductSchema = new Schema({
    owner: {
        required: [true, 'Informe o Usuário'],
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    section: {
        type: Schema.Types.ObjectId,
        required: [true, 'Informe o Departamento'],
        ref: 'Section'
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
    stock: {
        type: Number,
        min: [0, 'Deve ser maior ou igual à 0']
    },
    buy_value: {
        type: Number,
        min: [0, 'Deve ser maior ou igual à 0']
    },
    price: {
        type: Number,
        required: [true, 'Informe o Preço'],
        min: [0, 'Deve ser maior ou igual à 0']
    },
    weight: {
        type: Number,
        min: [0, 'Deve ser maior ou igual à 0']
    },
    width: {
        type: Number,
        min: [0, 'Deve ser maior ou igual à 0']
    },
    height: {
        type: Number,
        min: [0, 'Deve ser maior ou igual à 0']
    },
    depth: {
        type: Number,
        min: [0, 'Deve ser maior ou igual à 0']
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
ProductSchema.pre('save', createdAt);
ProductSchema.pre('update', updatedAt);

module.exports = ProductSchema;
