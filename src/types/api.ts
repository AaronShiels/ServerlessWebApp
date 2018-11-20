declare module "api" {
	import * as Lambda from "aws-lambda";

	export type Request = Lambda.APIGatewayProxyEvent;
	export type Response = Lambda.APIGatewayProxyResult;
	export type Context = Lambda.APIGatewayEventRequestContext;
	export type Handler = Lambda.APIGatewayProxyHandler;
	export type Callback = Lambda.APIGatewayProxyCallback;
}
