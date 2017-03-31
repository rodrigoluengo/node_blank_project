let mongoose  = require('mongoose');
let Schema    = mongoose.Schema;
let createdAt = require('../resources/schemas/createdAt');
let updatedAt = require('../resources/schemas/updatedAt');

let FileSchema = new Schema({
  owner: {
    required: [true, 'Informe o Usuário'],
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    maxlength: [400, 'URL deve ter no máximo 400 caracteres']
  },
  contentType: {
    type: String,
    required: [true, 'Informe o Tipo']
  },
  size: Number,
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
FileSchema.pre('save', createdAt);
FileSchema.pre('update', updatedAt);


module.exports = FileSchema;
