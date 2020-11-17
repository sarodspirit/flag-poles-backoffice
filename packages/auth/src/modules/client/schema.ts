export const postTokenSchema = {
	summary: 'generate client token',
	description: 'client',
	body: {
		type: 'object',
		required: ['key', 'secret'],
		properties: {
			key: { type: 'string', format: 'uuid' },
			secret: { type: 'string', minLength: 8 },
		},
	},
};

export const postCreateClientSchema = {
	summary: 'create client',
	description: 'create client',
	body: {
		type: 'object',
		required: ['name', 'secret'],
		properties: {
			name: { type: 'string' },
			secret: { type: 'string', minLength: 8 },
		},
	},
	response: {
		200: {
			type: 'object',
			properties: {
				key: { type: 'string', format:'uuid' },
			},
		},
	},
};
