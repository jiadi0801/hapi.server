const Hapi = require('hapi');
const fs = require('fs');
const path = require('path');
const mockyaml = require('mock-yaml');

const config = mockyaml.toJSON(fs.readFileSync(path.resolve(process.cwd(), 'api.yml')).toString());

// Create a server with a host and port
const server = new Hapi.Server({
    host: config.host,
    port: config.port,
    routes: {
        cors: {
            origin: ['*']
        }
    }
});

// hello world
server.route({
    method: 'GET',
    path: '/',
    handler: function(request, replay) {
        return replay.response('hello hapi.server!');
    }
});


config.apiList.forEach(api => {
    server.route({
        method: api.method || 'get',
        path: api.path,
        handler: function(request, replay) {
            try {
                let res = fs.readFileSync(path.resolve(process.cwd(), config.resDir, api.resPath)).toString();

                let extname = path.extname(api.resPath)
                if (extname === '.json') {
                    res = JSON.parse(res);
                }
                else if (extname === '.yml') {
                    res = mockyaml.toJSON(res);
                }
    
                return replay.response(res);
            } catch (e) {
                console.log(e);
                return replay.response(500);
            }
            
        }
    })
})


// Start the server
server.start().then(() => {
    console.log('Server running at:', server.info.uri);
}).catch(err => {
    console.log(err);
});
