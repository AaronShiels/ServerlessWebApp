import {
	ApiRequest,
	ApiResponse,
	badRequest,
	createApiHandler,
	notFound,
	ok
	} from '../utilities/api';
import { getGameByKey, IGameData } from '../utilities/gamesRepository';

async function handler(req: ApiRequest): Promise<ApiResponse> {
	if (!req.pathParameters || !req.pathParameters.proxy) {
		return badRequest();
	}

	const gameKey: string = req.pathParameters.proxy;
	const game: IGameData | undefined = await getGameByKey(gameKey);
	if (game) {
		return ok(game);
	} else {
		return notFound();
	}
}

export default createApiHandler(handler);
