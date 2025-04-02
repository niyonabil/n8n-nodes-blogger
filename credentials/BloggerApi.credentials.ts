import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class BloggerApi implements ICredentialType {
	name = 'bloggerApi';
	displayName = 'Blogger API';
	documentationUrl = 'https://developers.google.com/blogger/docs/3.0/getting_started';
	
	properties: INodeProperties[] = [
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'options',
			options: [
				{
					name: 'API Key',
					value: 'apiKey',
				},
				{
					name: 'OAuth2',
					value: 'oAuth2',
				},
			],
			default: 'apiKey',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
					authentication: ['apiKey'],
				},
			},
		},
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
					authentication: ['oAuth2'],
				},
			},
			typeOptions: {
				password: true,
			},
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			qs: {
				'key': '={{$credentials.authentication === "apiKey" ? $credentials.apiKey : undefined}}',
			},
			headers: {
				'Authorization': '={{$credentials.authentication === "oAuth2" ? "Bearer " + $credentials.accessToken : undefined}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://www.googleapis.com/blogger/v3',
			url: '/users/self/blogs',
		},
	};
}
