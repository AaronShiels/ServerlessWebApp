import { ok, ApiHandler, badRequest } from "../framework/api";
import { getInventory, createInventory } from "../framework/repository";

const handler: ApiHandler = async ({ pathParameters }) => {
	if (!pathParameters || !pathParameters.proxy) {
		return badRequest();
	}

	const inventory = await getInventory(pathParameters.proxy);
	if (inventory) {
		return ok(inventory);
	} else {
		const newInventory = { id: pathParameters.proxy, name: "Demo Inventory", orders: [] };
		await createInventory(newInventory);

		return ok(newInventory);
	}
};

export default handler;
