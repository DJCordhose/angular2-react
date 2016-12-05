import Hapi from 'hapi';
import Inert from 'inert';
import path from 'path';

const server = new Hapi.Server();
const publicPath = path.join(__dirname, '/../../../public');

import renderRoute from '../renderRoute';

server.connection({
    port: 3000
});

require('./devServerHapi').setup(server, publicPath);

server.register(Inert, () => {
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        const html = renderRoute(5000);
        reply(html);
    }
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: publicPath
        }
    }
});

server.start(() => console.log(`Server running at: ${server.info.uri}`));