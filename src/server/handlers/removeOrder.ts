import { response, ApiHandler, StatusCode } from "../framework/api";
import { getInventory, updateInventory } from "../framework/repository";

const handler: ApiHandler = async ({ pathParameters }) => {
	if (!pathParameters || !pathParameters.inventoryId || !!pathParameters.orderId) {
		return response(StatusCode.BadRequest, "Missing parameters.");
	}

	const inventory = await getInventory(pathParameters.proxy);
	if (!inventory) {
		return response(StatusCode.NotFound, "Inventory not found.");
	}

	const orderIndex = inventory.orders.findIndex(o => o.id == pathParameters.orderId);
	if (!orderIndex) {
		return response(StatusCode.NotFound, "Order not found.");
	}

	const updatedInventory = {
		...inventory,
		orders: [...inventory.orders.slice(0, orderIndex), ...inventory.orders.slice(orderIndex + 1)],
	};
	await updateInventory(updatedInventory);

	return response(StatusCode.NoContent);
};

export default handler;
