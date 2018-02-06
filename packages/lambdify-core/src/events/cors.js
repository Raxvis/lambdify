export const cors = {
	'consumes': ['application/json'],
	'produces': ['application/json'],
	'responses': {
		'200': {
			'description': '200 response',
			'headers': {
				'Access-Control-Allow-Credentials': { 'type': 'string' },
				'Access-Control-Allow-Headers': { 'type': 'string' },
				'Access-Control-Allow-Methods': { 'type': 'string' },
				'Access-Control-Allow-Origin': { 'type': 'string' },
			},
		},
	},
	'x-amazon-apigateway-integration': {
		'passthroughBehavior': 'when_no_match',
		'requestTemplates': { 'application/json': '{statusCode:200}' },
		'responses': {
			'default': {
				'responseParameters': {
					'method.response.header.Access-Control-Allow-Credentials': "'false'",
					'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
					'method.response.header.Access-Control-Allow-Methods': "'OPTIONS,GET,PUT,POST,DELETE,HEAD'",
					'method.response.header.Access-Control-Allow-Origin': "'*'",
				},
				'statusCode': '200',
			},
		},
		'type': 'mock',
	},
};

export default cors;