import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
	IDataObject,
	IHttpRequestOptions,
} from 'n8n-workflow';

export class Blogger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Blogger',
		name: 'blogger',
		icon: 'file:blogger.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Blogger API',
		defaults: {
			name: 'Blogger',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'bloggerApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://www.googleapis.com/blogger/v3',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Blog',
						value: 'blog',
					},
					{
						name: 'Post',
						value: 'post',
					},
					{
						name: 'Comment',
						value: 'comment',
					},
				],
				default: 'blog',
			},
			
			// BLOG OPERATIONS
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['blog'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a blog by ID',
						action: 'Get a blog',
					},
					{
						name: 'Get by URL',
						value: 'getByUrl',
						description: 'Get a blog by URL',
						action: 'Get a blog by URL',
					},
					{
						name: 'List',
						value: 'list',
						description: 'List blogs by user',
						action: 'List blogs',
					},
				],
				default: 'get',
			},
			
			// POST OPERATIONS
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['post'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a post',
						action: 'Create a post',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a post',
						action: 'Delete a post',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a post by ID',
						action: 'Get a post',
					},
					{
						name: 'List',
						value: 'list',
						description: 'List posts in a blog',
						action: 'List posts',
					},
					{
						name: 'Search',
						value: 'search',
						description: 'Search for posts',
						action: 'Search posts',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a post',
						action: 'Update a post',
					},
					{
						name: 'Publish',
						value: 'publish',
						description: 'Publish a draft post',
						action: 'Publish a post',
					},
				],
				default: 'list',
			},
			
			// COMMENT OPERATIONS
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['comment'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a comment by ID',
						action: 'Get a comment',
					},
					{
						name: 'List',
						value: 'list',
						description: 'List comments on a post',
						action: 'List comments',
					},
					{
						name: 'List by Blog',
						value: 'listByBlog',
						description: 'List comments on a blog',
						action: 'List comments by blog',
					},
					{
						name: 'Approve',
						value: 'approve',
						description: 'Approve a comment',
						action: 'Approve a comment',
					},
					{
						name: 'Mark as Spam',
						value: 'markAsSpam',
						description: 'Mark a comment as spam',
						action: 'Mark a comment as spam',
					},
					{
						name: 'Remove Content',
						value: 'removeContent',
						description: 'Remove content from a comment',
						action: 'Remove content from a comment',
					},
				],
				default: 'list',
			},
			
			// FIELDS FOR BLOG OPERATIONS
			// Get Blog
			{
				displayName: 'Blog ID',
				name: 'blogId',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['blog'],
						operation: ['get'],
					},
				},
				description: 'The ID of the blog to retrieve',
			},
			
			// Get Blog by URL
			{
				displayName: 'Blog URL',
				name: 'url',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['blog'],
						operation: ['getByUrl'],
					},
				},
				description: 'The URL of the blog to retrieve',
			},
			
			// List Blogs
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				required: true,
				default: 'self',
				displayOptions: {
					show: {
						resource: ['blog'],
						operation: ['list'],
					},
				},
				description: 'The ID of the user whose blogs are to be retrieved. Use "self" for the authenticated user.',
			},
			
			// FIELDS FOR POST OPERATIONS
			// Common field for most post operations
			{
				displayName: 'Blog ID',
				name: 'blogId',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['post'],
						operation: ['get', 'list', 'create', 'delete', 'update', 'search', 'publish'],
					},
				},
				description: 'The ID of the blog',
			},
			
			// Get, Delete, Update, Publish Post
			{
				displayName: 'Post ID',
				name: 'postId',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['post'],
						operation: ['get', 'delete', 'update', 'publish'],
					},
				},
				description: 'The ID of the post',
			},
			
			// Create, Update Post
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['post'],
						operation: ['create', 'update'],
					},
				},
				description: 'The title of the post',
			},
			{
				displayName: 'Content',
				name: 'content',
				type: 'string',
				default: '',
				typeOptions: {
					rows: 4,
				},
				displayOptions: {
					show: {
						resource: ['post'],
						operation: ['create', 'update'],
					},
				},
				description: 'The content of the post',
			},
			{
				displayName: 'Labels',
				name: 'labels',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['post'],
						operation: ['create', 'update'],
					},
				},
				description: 'Comma-separated list of labels for the post',
			},
			
			// Search Posts
			{
				displayName: 'Query',
				name: 'q',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['post'],
						operation: ['search'],
					},
				},
				description: 'The search query',
			},
			
			// FIELDS FOR COMMENT OPERATIONS
			// Common field for most comment operations
			{
				displayName: 'Blog ID',
				name: 'blogId',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['comment'],
						operation: ['get', 'list', 'listByBlog', 'approve', 'markAsSpam', 'removeContent'],
					},
				},
				description: 'The ID of the blog',
			},
			
			// List Comments
			{
				displayName: 'Post ID',
				name: 'postId',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['comment'],
						operation: ['get', 'list', 'approve', 'markAsSpam', 'removeContent'],
					},
				},
				description: 'The ID of the post',
			},
			
			// Get, Approve, Mark as Spam, Remove Content Comment
			{
				displayName: 'Comment ID',
				name: 'commentId',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['comment'],
						operation: ['get', 'approve', 'markAsSpam', 'removeContent'],
					},
				},
				description: 'The ID of the comment',
			},
			
			// COMMON OPTIONAL FIELDS
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				options: [
					{
						displayName: 'Max Results',
						name: 'maxResults',
						type: 'number',
						default: 10,
						description: 'Maximum number of results to return',
					},
					{
						displayName: 'Page Token',
						name: 'pageToken',
						type: 'string',
						default: '',
						description: 'Token for pagination',
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						options: [
							{
								name: 'Draft',
								value: 'draft',
							},
							{
								name: 'Live',
								value: 'live',
							},
							{
								name: 'Scheduled',
								value: 'scheduled',
							},
						],
						default: 'live',
						description: 'Status of the post',
					},
					{
						displayName: 'Fetch Bodies',
						name: 'fetchBodies',
						type: 'boolean',
						default: true,
						description: 'Whether to fetch the body content of posts',
					},
					{
						displayName: 'Fetch Images',
						name: 'fetchImages',
						type: 'boolean',
						default: false,
						description: 'Whether to fetch images in the post content',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		let responseData;
		
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		
		for (let i = 0; i < items.length; i++) {
			try {
				// ----------------------------------------
				// BLOG OPERATIONS
				// ----------------------------------------
				if (resource === 'blog') {
					// GET BLOG
					if (operation === 'get') {
						const blogId = this.getNodeParameter('blogId', i) as string;
						
						const endpoint = `/blogs/${blogId}`;
						
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: endpoint,
						});
					}
					
					// GET BLOG BY URL
					else if (operation === 'getByUrl') {
						const url = this.getNodeParameter('url', i) as string;
						
						const endpoint = `/blogs/byurl`;
						const qs: IDataObject = { url };
						
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: endpoint,
							qs,
						});
					}
					
					// LIST BLOGS
					else if (operation === 'list') {
						const userId = this.getNodeParameter('userId', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						
						const endpoint = `/users/${userId}/blogs`;
						const qs: IDataObject = {};
						
						if (additionalFields.maxResults) {
							qs.maxResults = additionalFields.maxResults;
						}
						
						if (additionalFields.pageToken) {
							qs.pageToken = additionalFields.pageToken;
						}
						
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: endpoint,
							qs,
						});
					}
				}
				
				// ----------------------------------------
				// POST OPERATIONS
				// ----------------------------------------
				else if (resource === 'post') {
					const blogId = this.getNodeParameter('blogId', i) as string;
					
					// GET POST
					if (operation === 'get') {
						const postId = this.getNodeParameter('postId', i) as string;
						
						const endpoint = `/blogs/${blogId}/posts/${postId}`;
						
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: endpoint,
						});
					}
					
					// LIST POSTS
					else if (operation === 'list') {
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						
						const endpoint = `/blogs/${blogId}/posts`;
						const qs: IDataObject = {};
						
						if (additionalFields.maxResults) {
							qs.maxResults = additionalFields.maxResults;
						}
						
						if (additionalFields.pageToken) {
							qs.pageToken = additionalFields.pageToken;
						}
						
						if (additionalFields.status) {
							qs.status = additionalFields.status;
						}
						
						if (additionalFields.fetchBodies !== undefined) {
							qs.fetchBodies = additionalFields.fetchBodies;
						}
						
						if (additionalFields.fetchImages !== undefined) {
							qs.fetchImages = additionalFields.fetchImages;
						}
						
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: endpoint,
							qs,
						});
					}
					
					// CREATE POST
					else if (operation === 'create') {
						const title = this.getNodeParameter('title', i) as string;
						const content = this.getNodeParameter('content', i) as string;
						const labels = this.getNodeParameter('labels', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						
						const endpoint = `/blogs/${blogId}/posts`;
						
						const body: IDataObject = {
							title,
							content,
						};
						
						if (labels) {
							body.labels = labels.split(',').map(label => label.trim());
						}
						
						if (additionalFields.status) {
							body.status = additionalFields.status;
						}
						
						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: endpoint,
							body,
						});
					}
					
					// UPDATE POST
					else if (operation === 'update') {
						const postId = this.getNodeParameter('postId', i) as string;
						const title = this.getNodeParameter('title', i) as string;
						const content = this.getNodeParameter('content', i) as string;
						const labels = this.getNodeParameter('labels', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						
						const endpoint = `/blogs/${blogId}/posts/${postId}`;
						
						const body: IDataObject = {
							title,
							content,
						};
						
						if (labels) {
							body.labels = labels.split(',').map(label => label.trim());
						}
						
						if (additionalFields.status) {
							body.status = additionalFields.status;
						}
						
						responseData = await this.helpers.httpRequest({
							method: 'PUT',
							url: endpoint,
							body,
						});
					}
					
					// DELETE POST
					else if (operation === 'delete') {
						const postId = this.getNodeParameter('postId', i) as string;
						
						const endpoint = `/blogs/${blogId}/posts/${postId}`;
						
						responseData = await this.helpers.httpRequest({
							method: 'DELETE',
							url: endpoint,
						});
					}
					
					// SEARCH POSTS
					else if (operation === 'search') {
						const q = this.getNodeParameter('q', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						
						const endpoint = `/blogs/${blogId}/posts/search`;
						const qs: IDataObject = { q };
						
						if (additionalFields.maxResults) {
							qs.maxResults = additionalFields.maxResults;
						}
						
						if (additionalFields.fetchBodies !== undefined) {
							qs.fetchBodies = additionalFields.fetchBodies;
						}
						
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: endpoint,
							qs,
						});
					}
					
					// PUBLISH POST
					else if (operation === 'publish') {
						const postId = this.getNodeParameter('postId', i) as string;
						
						const endpoint = `/blogs/${blogId}/posts/${postId}/publish`;
						
						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: endpoint,
						});
					}
				}
				
				// ----------------------------------------
				// COMMENT OPERATIONS
				// ----------------------------------------
				else if (resource === 'comment') {
					const blogId = this.getNodeParameter('blogId', i) as string;
					
					// GET COMMENT
(Content truncated due to size limit. Use line ranges to read in chunks)