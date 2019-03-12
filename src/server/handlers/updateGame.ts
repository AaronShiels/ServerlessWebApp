import GameAction from "../../common/game/actions";
import reducer from "../../common/game/reducer";
import { badRequest, notFound, ok, ApiHandler } from "../framework/api";
import { getGameByKey, IGameData, newGame, updateGameById } from "../framework/gamesRepository";

const handler: ApiHandler = async ({ pathParameters, body }) => {
	if (!pathParameters || !pathParameters.proxy || !body) {
		return badRequest();
	}

	const action = JSON.parse(body);
	if (!isGameAction(action)) {
		return badRequest();
	}

	const gameKey: string = pathParameters.proxy;
	const game: IGameData | undefined = action.type === "CREATE" ? newGame() : await getGameByKey(gameKey);
	if (!game) {
		return notFound();
	}

	const updatedGame: IGameData = {
		...game,
		state: reducer(game.state, action),
		actions: [...game.actions, action],
	};
	await updateGameById(updatedGame);

	return ok();
};

export default handler;

function isGameAction(action: any): action is GameAction {
	return typeof action.type === "string";
}
