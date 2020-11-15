import httpErrors from 'http-errors';
export default function clientHandler(server, options, next) {
	server.post('/auth', async (req, res) => {
		req.log.info('get token with key/secret');
		const client = await server.db.clients.findOne({where: {key: req.body.key}});
		if(client && await client.compareSecret(req.body.secret)){
			return res.send(server.jwt.sign(await client.generateJWTPayload()));
		}
		return res.send(httpErrors.gone());
	});
	server.post('/create', async(req, res)=>{
		req.log.info('create client with secret');
		const client = await server.db.clients.create({secret:req.body.secret, name: req.body.name});
		await server.db.clients.save(client);
		res.send(client);
	});
	next();
}
