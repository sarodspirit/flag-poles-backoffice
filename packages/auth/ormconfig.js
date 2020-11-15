module.exports = {
	'type': 'postgres',
	'url': process.env.AUTH_DATABASE_URL,
	'useNewUrlParser': true,
	'synchronize': true,
	'logging': true,
	'entities': ['src/entity/*.*'],
	'useUnifiedTopology': true
};