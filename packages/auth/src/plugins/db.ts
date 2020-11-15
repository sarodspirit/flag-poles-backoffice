import 'reflect-metadata';
import fp from 'fastify-plugin';
import { createConnection, getConnectionOptions } from 'typeorm';
import { Client } from '../modules/client/entity';

export default fp(async (server) => {
	try {
		const connectionOptions = await getConnectionOptions();
		Object.assign(connectionOptions, {
			options: { encrypt: true },
			entities: [Client],
		});

		const connection = await createConnection(connectionOptions);
		console.log('database connected');

		server.decorate('db', {
			clients: connection.getRepository(Client),
		});
	} catch (error) {
		console.log(error);
		console.log('make sure you have set .env variables - see .env.sample');
	}
});
