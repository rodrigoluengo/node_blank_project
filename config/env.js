let join = require('path').join;
let xconf = require('xconf')();


if(process.env.NODE_ENV === 'production')
{
    xconf.file(join(__dirname, '../env/production.json'));
    xconf.development = false;
    xconf.test = false;
    xconf.production = true;
}
else if(process.env.NODE_ENV === 'test')
{
    xconf.file(join(__dirname, '../env/test.json'));
    xconf.development = false;
    xconf.test = true;
    xconf.production = false;
}
else
{
    xconf.file(join(__dirname, '../env/development.json'));
    xconf.development = true;
    xconf.test = false;
    xconf.production = false;
}

module.exports = xconf;