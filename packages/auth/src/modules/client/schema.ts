export const TOKEN_SCHEMA = {
	schema: {
		body: {
			type: 'object',
			required: ['key', 'secret'],
			properties: {
				key: { type: 'string', format: 'uuid' },
				secret: { type: 'string' }
			}
		}
	}
};