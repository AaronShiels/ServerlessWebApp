
import { badRequest, notFound, ok, ApiHandler } from "../framework/api";
import Order from "../../common/contracts/Order";
import { getInventory } from "../framework/repository";

const handler: ApiHandler = async ({ pathParameters, body }) => {
	if (!pathParameters || !pathParameters.proxy || !body) {
		return badRequest();
	}

	const orders = JSON.parse(body) as Order[];
	const inventory = await getInventory(pathParameters.proxy);
	if (!inventory) {
		return notFound();
	}

	const updatedInventory = {
		...game,
		state: reducer(game.state, action),
		actions: [...game.actions, action],
	};
	await updateGameById(updatedGame);

	return ok();
};

export default handler;
