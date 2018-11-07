declare module "serverless-http" {
	import * as core from "express-serve-static-core";

	export default function serverless(app: any): any;
}
