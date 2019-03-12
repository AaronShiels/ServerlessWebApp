import { badRequest, notFound, ok, ApiHandler } from "../framework/api";
import { getGameByKey, IGameData } from "../framework/gamesRepository";

const handler: ApiHandler = async ({ pathParameters }) => {
	if (!pathParameters || !pathParameters.proxy) {
		return badRequest();
	}

	const gameKey: string = pathParameters.proxy;
	const game: IGameData | undefined = await getGameByKey(gameKey);
	if (game) {
		return ok(game);
	} else {
		return notFound();
	}
};

export default handler;
