let mongoose        = require('mongoose');
let fs              = require('fs');
let join            = require('path').join;
mongoose.Promise    = global.Promise;

let models = join(__dirname, '../models');
fs.readdirSync(models)
    .filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(function (file)
    {
        require(join(models, file));
        console.log('Register Model: %s', file);
    });

let settings = env.get('databases.mongodb');

module.exports = function()
{
    return mongoose.connect(settings.connection, settings.options).connection;
};
