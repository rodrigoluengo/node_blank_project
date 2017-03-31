let mongoose        = require('mongoose');
let Schema          = mongoose.Schema;
let JWT             = require('jsonwebtoken');
let moment          = require('moment');
let uniqueValidator = require('mongoose-unique-validator');
let validator       = require('validator');
let Password        = require('../resources/Password');
let createdAt       = require('../resources/schemas/createdAt');
let updatedAt       = require('../resources/schemas/updatedAt');

// User Schema
let UserSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        maxlength: [128, 'Nome deve ter no máximo 128 caracteres'],
        validate: {
            validator: function(val) {
                return val && !val.isBlank();
            },
            message: 'Informe o Nome'
        }
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
    password: {
        type: String,
        required: [true, 'Informe a Senha']
    },
    profile: {
        type: String,
        required: [true, 'Informe o Perfil'],
        enum: {values: ['ADM', 'SEL', 'BUY'], message: 'Informe um Perfil válido'}
    },
    status: {
        type: String,
        required: [true, 'Informe o Status'],
        enum: {values: ['ACT', 'INA'], message: 'Informe um Status válido'}
    },
    token: String,
    createdAt: Date,
    updatedAt: Date,
});

// Unique Validator Required
UserSchema.plugin(uniqueValidator, { message: 'O E-mail {VALUE} não está disponível' });


// Find by Token
UserSchema.statics.findByToken = function(token, next)
{
    return this.findOne({ token: token }, next);
};

// Find by credentials
UserSchema.statics.findByCredential = function(credential, next)
{
    return this.findOne({
        email: credential.email,
        password: Password.encrypt(credential.password)
        },
        'name email profile status token'
        , next);
};



// On Save create api_key if not exists
UserSchema.pre('save', function(next)
{
    if(this.token)
        return next();

    this.token = JWT.sign(`${this.id}${moment.now()}`, env.get('app.key'));

    next();
});

// Crypt password if change password
UserSchema.pre('save', function(next)
{
    // only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();

    this.password = Password.encrypt(this.password);

    next();
});

// Crypt password if change password
UserSchema.pre('update', function()
{
    // only hash the password if it has been modified (or is new)
    var password = this.getUpdate().$set.password;
    if (!validator.isEmpty(password))
        this.update({}, {password: Password.encrypt(password)});

});

// Get Owner User
UserSchema.methods.getOwner = function()
{
    return this.owner ? this.owner : this;
}

// Created and Updated Date
UserSchema.pre('save', createdAt);
UserSchema.pre('update', updatedAt);

module.exports = UserSchema;
