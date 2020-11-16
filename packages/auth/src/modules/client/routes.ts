import createError from 'http-errors';
import { TOKEN_SCHEMA } from './schema';
export default function clientHandler(server, options, next) {
	server.post('/token', TOKEN_SCHEMA,  async (req, res) => {
		req.log.info('get token with key/secret');
		const client = await server.db.clients.findOne({where: {key: req.body.key}});
		if(client && await client.compareSecret(req.body.secret)){
			return res.send(server.jwt.sign(await client.generateJWTPayload()));
		}

		return res.send(createError(404));
	});
	server.post('/', async(req, res)=>{
		req.log.info('create client with secret');
		const client = await server.db.clients.create({secret:req.body.secret, name: req.body.name});
		if(client){
			await server.db.clients.save(client);
			return res.send(client);
		}
		return res.send(createError(404));

	});
	next();
}
