let mongoose = require('mongoose');
let FileSchema = require('../schemas/FileSchema');

module.exports = mongoose.model('File', FileSchema);
