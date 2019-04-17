import { ApiHandler, response, StatusCode, parse } from "../framework/api";
import { getInventory, createInventory } from "../framework/repository";
import IInventory from "../../common/contracts/IInventory";
import { Omit } from "../../common/utilities";

type Payload = Omit<IInventory, "id">;

const handler: ApiHandler = async ({ body }) => {
	if (!body) {
		return response(StatusCode.BadRequest, "Missing parameters.");
	}

	const id = "demo"; // Hardcoded for demo
	const currentInventory = await getInventory(id);

	if (currentInventory) {
		return response(StatusCode.BadRequest, "Inventory already exists.");
	} else {
		const newInventory = { ...parse<Payload>(body), id };
		await createInventory(newInventory);

		return response(StatusCode.Created, newInventory);
	}
};

export default handler;
