export default {
	secret: process.env.JWT_SECRET || 'supersecret',
	sign: { algorithm: 'HS256' }
};