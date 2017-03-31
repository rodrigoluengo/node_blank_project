let mongoose = require('mongoose');
let UserSchema = require('../schemas/UserSchema');
module.exports = mongoose.model('User', UserSchema);