import * as Api from 'api';

export async function handler(req: Api.Request): Promise<Api.Response> {
	return {
		statusCode: 200,
		body: "hello world",
	};
}
