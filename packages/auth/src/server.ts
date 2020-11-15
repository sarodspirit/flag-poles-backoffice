import fastify from 'fastify';

import db from './plugins/db';
import oas from './plugins/oas';
import jwt from './plugins/jwt';

import healthHandler from './modules/health/routes';
import clientHandler from './modules/client/routes';

function createServer() {
	const server = fastify();
	server.register(require('fastify-cors'));
	server.register(require('fastify-oas'), oas);
	server.register(require('fastify-jwt'), jwt);
	server.register(db);
    
	server.register(healthHandler, { prefix: '/health' });
	server.register(clientHandler, { prefix: '/client' });

	server.setErrorHandler((error, req, res) => {
		req.log.error(error.toString());
		res.send({ error });
	});

	return server;
}

export default createServer;
