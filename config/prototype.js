let fs              = require('fs');
let join            = require('path').join;
let prototypes = join(__dirname, '../resources/prototypes');
fs.readdirSync(prototypes)
    .filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(function (file)
    {
        require(join(prototypes, file));
        console.log('Register Prototype: %s', file);
    });