import { badRequest, notFound, ok, ApiHandler } from "../framework/api";
import IOrder from "../../common/contracts/IOrder";
import { getInventory, updateInventory } from "../framework/repository";

const handler: ApiHandler = async ({ pathParameters, body }) => {
	if (!pathParameters || !pathParameters.proxy || !body) {
		return badRequest();
	}

	const orders = JSON.parse(body) as IOrder[];
	const inventory = await getInventory(pathParameters.proxy);
	if (!inventory) {
		return notFound();
	}

	const updatedInventory = {
		...inventory,
		orders,
	};
	await updateInventory(updatedInventory);

	return ok();
};

export default handler;
