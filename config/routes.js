let fs = require('fs');
let join = require('path').join;
let pathRoutes = join(__dirname, '../routes');

module.exports = app =>
{
    let load = function(path)
    {
        let items = fs.readdirSync(path);

        items.forEach(function(item)
        {
            let route = join(path, item);
            let stat = fs.statSync(route);

            if(stat.isDirectory())
                load(route);
            else
            {
                let name = route.replace(pathRoutes, '').replace('.js', '').replace(/\\/g, '/');
                app.use(name, require(route));

                if(app.get('env') !== 'test')
                    console.log("Register Route: %s", name);
            }
        });
    };

    load(pathRoutes);

    // Error 404
    app.use(function(req, res)
    {
        res.status(404).json({errors:{resource: 'resource_not_found'}});
    });
};