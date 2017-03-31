let mongoose = require('mongoose');
let MediaSchema = require('../schemas/MediaSchema');

module.exports = mongoose.model('Media', MediaSchema);