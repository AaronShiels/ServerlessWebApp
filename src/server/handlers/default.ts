import {
	ApiRequest,
	ApiResponse,
	createApiHandler,
	ok
	} from '../framework/api';

async function handler(req: ApiRequest): Promise<ApiResponse> {
	return ok("Hello world");
}

export default createApiHandler(handler);
