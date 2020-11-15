export default {
	routePrefix: '/docs',
	exposeRoute: true,
	swagger: {
		info: {
			title: 'flag-poles auth api',
			description: 'api documentation',
			version: '0.1.0'
		},
		servers: [
			{ url: 'http://localhost:9000', description: 'development' },
			{
				url: 'https://<production-url>',
				description: 'production'
			}
		],
		schemes: ['http'],
		consumes: ['application/json'],
		produces: ['application/json'],
	}
};