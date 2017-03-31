module.exports = app => {

    // Prototypes
    require('./prototype');

    // Data Base
    let database = require('./database');

    // Settings App
    require('./app')(app);

    // Authenticated
    require('./authenticated');

    // Settings Routes
    require('./routes')(app);

    // Data Base
    return database;

}
