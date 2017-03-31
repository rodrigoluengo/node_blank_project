let express         = require('express');
let morgan          = require('morgan');
let bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
let HttpStatus      = require('http-status-codes');

global.HttpStatus   = HttpStatus;

module.exports = app =>
{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.text());
    app.use(bodyParser.json({ type: 'application/json'}));
    app.use(express.static('public'));
    app.use(methodOverride());

    if (app.get('env') !== 'test')
    {
        app.use(morgan('combined'));
    }

    app.use(function(err, req, res, next)
    {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });

    app.use(function(req, res, next)
    {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    });

}



