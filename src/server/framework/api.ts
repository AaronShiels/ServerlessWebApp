import * as Lambda from "aws-lambda";

enum StatusCode {
	Ok = 200,
	Created = 201,
	Accepted = 202,
	NoContent = 203,
	NotModified = 304,
	BadRequest = 400,
	Unauthorized = 401,
	Forbidden = 403,
	NotFound = 404,
	Fuck = 500,
}

type ApiRequest = Lambda.APIGatewayProxyEvent;
type ApiResponse = Lambda.APIGatewayProxyResult;
type ApiContext = Lambda.APIGatewayEventRequestContext;
type ApiHandler = (req: ApiRequest, ctx: ApiContext) => Promise<ApiResponse>;

const parse = <T>(body: string) => JSON.parse(body) as T;

const response = (statusCode: StatusCode, payload?: object | string): ApiResponse => {
	let body: string = "";
	if (typeof payload === "object") {
		body = JSON.stringify(payload);
	} else if (typeof payload === "string") {
		body = payload;
	}

	return { statusCode: statusCode, body };
};

export { ApiHandler, StatusCode, response, parse };
