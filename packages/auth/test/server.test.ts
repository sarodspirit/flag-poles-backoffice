import typeorm = require('typeorm');
const clients = [
	{
		_id: '5f2678dff22e1f4a3c0782ee',
		key: 'someKey',
		secret: 'someSecret',
		unit: 1,
	}
];
const dbMock = {
	Client: {
		create:jest.fn().mockReturnValue(clients[0]),
		find: jest.fn().mockReturnValue(clients),
		findOne: jest.fn().mockReturnValue(clients[0]),
		save: jest.fn().mockReturnValue(clients[0]),
		remove: jest.fn(),
		hashSecret:jest.fn(),
		compareSecret:jest.fn().mockReturnValue(true),
		generateJWTPayload:jest.fn().mockReturnValueOnce('somePayload')
	},
};
typeorm.createConnection = jest.fn().mockReturnValue({
	getRepository: (model) => dbMock[model.name],
});

typeorm.getConnectionOptions = jest.fn().mockReturnValue({});

describe('Server', () => {
	let server;

	beforeEach(async () => {
		server = await require('../src/index');
		await server.ready();
	});

	afterAll(() => server.close());

	test('/health returns ok', (done) => {
		server.inject(
			{
				method: 'GET',
				url: '/health',
			},
			(err, res) => {
				expect(res.statusCode).toBe(200);
				expect(JSON.parse(res.payload)).toEqual({ status: 'ok' });
				done(err);
			}
		);
	});

	test('POST /client creates client ', (done) => {
		server.inject(
			{
				method: 'POST',
				url: '/client',
				payload:{
					name:'someName',
					secret:'someSecret'
				}
			},
			(err, res) => {
				expect(res.statusCode).toBe(200);
				expect(server.db.clients.create).toHaveBeenCalledWith({'name': 'someName', 'secret': 'someSecret'});
				expect(server.db.clients.save).toHaveBeenCalled();
				expect(JSON.parse(res.payload)).toEqual(clients[0]);
				done(err);
			}
		);
	});
	test('POST /client creates returns error if client is not created ', (done) => {
		dbMock.Client.create.mockReturnValueOnce(null);
		server.inject(
			{
				method: 'POST',
				url: '/client',
				payload:{
					name:'someName',
					secret:'someSecret'
				}
			},
			(err, res) => {
				expect(res.statusCode).toBe(404);
				expect(server.db.clients.create).toHaveBeenCalledWith({'name': 'someName', 'secret': 'someSecret'});
				done(err);
			}
		);
	});
	test('POST /client/token happy path', (done) => {
		dbMock.Client.findOne.mockReturnValueOnce(dbMock.Client);

		server.jwt.sign = jest.fn().mockReturnValueOnce('someJWTToken');
		server.inject(
			{
				method: 'POST',
				url: '/client/token',
				payload:{
					key: 'cbcf1cc2-e953-44b5-af17-00a0874c0bb8',
					secret: 'somesecret'
				}
			},
			(err, res) => {
				expect(res.statusCode).toBe(200);
				expect(dbMock.Client.compareSecret).toHaveBeenCalledWith('somesecret');
				expect(dbMock.Client.generateJWTPayload).toHaveBeenCalledTimes(1);
				expect(server.jwt.sign).toHaveBeenCalledWith('somePayload');
				expect(res.payload).toBe('someJWTToken');
				done(err);
			}
		);
	});
	test('POST /client/token returns error if client not found', (done) => {
		dbMock.Client.findOne.mockReturnValueOnce(null);
		server.inject(
			{
				method: 'POST',
				url: '/client/token',
				payload:{
					key:'cbcf1cc2-e953-44b5-af17-00a0874c0bb8',
					secret: 'somesecret'
				}
			},
			(err, res) => {
				expect(res.statusCode).toBe(404);
				done(err);
			}
		);
	});

});
