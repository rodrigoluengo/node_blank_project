let validator   = require('validator');
let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;
let createdAt   = require('../resources/schemas/createdAt');
let updatedAt   = require('../resources/schemas/updatedAt');

let PersonSchema = new Schema({
    owner: {
        required: [true, 'Informe o Usuário'],
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    moip_id: String,
    type: {
        type: String,
        required: [true, 'Informe o Tipo'],
        enum: {values: ['J', 'F'], message: 'Informe um Tipo válido'}
    },
    fullname: {
        type: String,
        maxlength: [90, 'Deve ter no máximo 90 caracteres'],
        validate: {
            validator: function(val) {
                return !val.isBlank();
            },
            message: 'É obrigatório'
        }
    },
    nickname: {
        type: String,
        maxlength: [90, 'Deve ter no máximo 90 caracteres']
    },
    status: {
        type: String,
        required: [true, 'Informe o Status'],
        enum: {values: ['ACT', 'INA'], message: 'Informe um Status válido'}
    },
    email: {
        type: String,
        required: [true, 'Informe o E-mail'],
        unique: true,
        maxlength: [45, 'E-mail deve ter no máximo 45 caracteres'],
        validate: [{
            validator: function(val) {
                return validator.isEmail(val);
            },
            message: 'E-mail parece inválido'
        }]
    },
    birthDate: {
        type: Date,
        max: Date.now()
    },
    taxDocument: {
        type: {
            type: String,
            enum: {values: ['CPF', 'CNPJ'], message: 'Informe um Documento válido'}
        },
        number: {
            type: String,
            validate: {
                validator: function(val) {
                    if(this.type == 'F'){
                        return val.isCPF();
                    } else {
                        return val.isCNPJ();
                    }
                },
                message: 'Documento inválido'
            }
        }
    },
    addresses: {
        required: [true, 'Informe um Endereço'],
        type: [{
            street: {
                type: String,
                required: [true, 'Informe o Logradouro'],
                maxlength: [45, 'Logradouro deve ter no máximo {MAXLENGTH} caracteres']
            },
            streetNumber: {
                type: String,
                required: [true, 'Informe o Número'],
                maxlength: [10, 'Número deve ter no máximo {MAXLENGTH} caracteres']
            },
            complement: {
                type: String,
                maxlength: [45, 'Complemento deve ter no máximo {MAXLENGTH} caracteres']
            },
            district: {
                type: String,
                required: [true, 'Informe o Bairro'],
                maxlength: [45, 'Bairro deve ter no máximo {MAXLENGTH} caracteres']
            },
            city: {
                type: String,
                required: [true, 'Informe a Cidade'],
                maxlength: [32, 'Cidade deve ter no máximo {MAXLENGTH} caracteres']
            },
            state: {
                type: String,
                required: [true, 'Informe o Estado'],
                maxlength: [32, 'Estado deve ter no máximo {MAXLENGTH} caracteres']
            },
            country: {
                type: String,
                required: [true, 'Informe o País'],
                maxlength: [3, 'País deve ter no máximo {MAXLENGTH} caracteres'],
                default: 'BRA'
            },
            zipCode: {
                type: String,
                required: [true, 'Informe o CEP'],
                maxlength: [9, 'País deve ter no máximo {MAXLENGTH} caracteres'],
                default: 'BRA'
            },
            default: Boolean
        }]
    },
    phones: {
        required: [true, 'Informe um Telefone'],
        type: [{
            countryCode: {
                type: Number,
                min: [0, 'Deve ser no mínimo {MIN}'],
                max: [99, 'Deve ser no máximo {MAX}']
            },
            areaCode: {
                type: Number,
                min: [0, 'Deve ser no mínimo {MIN}'],
                max: [99, 'Deve ser no máximo {MAX}']
            },
            number:{
                type: Number,
                min: [10000000, 'Deve ser no mínimo {MIN}'],
                max: [999999999, 'Deve ser no máximo {MAX}']
            },
            default: Boolean
        }]
    },
    detail: {
        type: String,
        maxlength: [4000, 'Observações deve ter no máximo {MAXLENGTH} caracteres']
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
PersonSchema.pre('save', createdAt);
PersonSchema.pre('update', updatedAt);

module.exports = PersonSchema;
