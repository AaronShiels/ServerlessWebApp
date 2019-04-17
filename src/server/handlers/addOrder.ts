import { response, ApiHandler, StatusCode, parse } from "../framework/api";
import IOrder from "../../common/contracts/IOrder";
import { getInventory, updateInventory } from "../framework/repository";
import { Omit, guid } from "../../common/utilities";

type Payload = Omit<IOrder, "id">;

const handler: ApiHandler = async ({ pathParameters, body }) => {
	if (!pathParameters || !pathParameters.inventoryId || !body) {
		return response(StatusCode.BadRequest, "Missing parameters.");
	}

	const inventory = await getInventory(pathParameters.proxy);
	if (!inventory) {
		return response(StatusCode.NotFound);
	}

	const newOrder = { ...parse<Payload>(body), id: guid() };
	const updatedInventory = {
		...inventory,
		orders: [...inventory.orders, newOrder],
	};
	await updateInventory(updatedInventory);

	return response(StatusCode.NoContent);
};

export default handler;
