import GameAction from '../../common/game/actions';
import reducer from '../../common/game/reducer';
import {
	ApiRequest,
	ApiResponse,
	badRequest,
	createApiHandler,
	notFound,
	ok
	} from '../framework/api';
import {
	getGameByKey,
	IGameData,
	newGame,
	updateGameById
	} from '../framework/gamesRepository';

async function handler(req: ApiRequest): Promise<ApiResponse> {
	if (!req.pathParameters || !req.pathParameters.proxy || !req.body) {
		return badRequest();
	}

	const action = JSON.parse(req.body);
	if (!isGameAction(action)) {
		return badRequest();
	}

	const gameKey: string = req.pathParameters.proxy;
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
}

export default createApiHandler(handler);

function isGameAction(action: any): action is GameAction {
	return typeof action.type === "string";
}
