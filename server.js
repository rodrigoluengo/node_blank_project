let express = require('express');
let app = express();
let Router = express.Router;
global.app = app;
global.Router = Router;
global.env = require('./config/env');
let config = require('./config')(app);

// Start the Server
config()
    .on('error', console.log)
    .on('disconnected', config)
    .on('open', function()
    {
        if(app.get('env') === 'test')
            return;

        app.listen(env.get('server.port'), function()
        {
            console.log('Start Server on port %s', env.get('server.port'));
        });
    });
module.exports = app;