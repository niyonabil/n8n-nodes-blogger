import { NodeType } from 'n8n-workflow';

import { Blogger } from './nodes/Blogger/Blogger.node';
import { BloggerApi } from './credentials/BloggerApi.credentials';

export class BloggerModule {
	public nodeTypes: NodeType[] = [
		{
			type: new Blogger(),
			sourcePath: __dirname + '/nodes/Blogger/Blogger.node.js',
		},
	];

	public credentialTypes = [
		{
			type: new BloggerApi(),
			sourcePath: __dirname + '/credentials/BloggerApi.credentials.js',
		},
	];
}
