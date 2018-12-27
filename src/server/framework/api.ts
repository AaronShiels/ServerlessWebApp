import * as Lambda from 'aws-lambda';

export type ApiRequest = Lambda.APIGatewayProxyEvent;
export type ApiResponse = Lambda.APIGatewayProxyResult;
export type ApiContext = Lambda.APIGatewayEventRequestContext;
export type ApiHandler = (req: ApiRequest, ctx: ApiContext) => Promise<ApiResponse>;

export function createApiHandler(handler: ApiHandler): ApiHandler {
	return handler;
}

export function ok(payload?: object | string): ApiResponse {
	let body: string = "";
	if (typeof payload === "object") {
		body = JSON.stringify(payload);
	} else if (typeof payload === "string") {
		body = payload;
	}

	return { statusCode: 200, body };
}

export function notFound(message?: string): ApiResponse {
	return { statusCode: 404, body: message || "" };
}

export function badRequest(message?: string): ApiResponse {
	return { statusCode: 400, body: message || "" };
}
