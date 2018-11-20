import * as Api from 'api';
import { getGame } from '../domain';

export async function handler(req: Api.Request): Promise<Api.Response> {
	const gameKey: string = (req.pathParameters && req.pathParameters.proxy) || "";
	const game = await getGame(gameKey);

	if (game) {
		return { statusCode: 200, body: JSON.stringify(game) };
	} else {
		return { statusCode: 404, body: "" };
	}
}
