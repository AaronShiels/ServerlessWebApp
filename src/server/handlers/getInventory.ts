import { ApiHandler, StatusCode, response } from "../framework/api";
import { getInventory } from "../framework/repository";

const handler: ApiHandler = async ({ pathParameters }) => {
	if (!pathParameters || !pathParameters.inventoryId || pathParameters.inventoryId != "demo") {
		return response(StatusCode.BadRequest, "Missing parameters.");
	}

	const inventory = await getInventory(pathParameters.inventoryId);
	if (inventory) {
		return response(StatusCode.Ok, inventory);
	} else {
		return response(StatusCode.NotFound);
	}
};

export default handler;
