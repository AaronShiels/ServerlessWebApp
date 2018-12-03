import { ApiRequest, ApiResponse, createApiHandler } from '../utilities/api';

async function handler(req: ApiRequest): Promise<ApiResponse> {
	return {
		statusCode: 200,
		body: "hello world",
	};
}

export default createApiHandler(handler);
