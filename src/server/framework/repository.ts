import { DynamoDB } from "aws-sdk";
import Inventory from "../../common/contracts/Inventory";

const database = process.env.IS_OFFLINE
	? new DynamoDB.DocumentClient({ region: "localhost", endpoint: "http://localhost:8000" })
	: new DynamoDB.DocumentClient();

const tableName: string = process.env.TABLE || "";

export function getInventory(id: string): Promise<Inventory | undefined> {
	const params = { TableName: tableName, Key: { id } };

	return new Promise<Inventory>((res, rej) => {
		database.get(params, (err, data) => {
			if (err) {
				rej(err);
			} else {
				res(data.Item as Inventory);
			}
		});
	});
}

export function createInventory(inventory: Inventory): Promise<void> {
	const params = { TableName: tableName, Item: inventory };

	return new Promise((res, rej) => {
		database.put(params, err => {
			if (err) {
				rej(err);
			} else {
				res();
			}
		});
	});
}

export function updateInventory({ id, orders }: Inventory): Promise<void> {
	const params = {
		TableName: tableName,
		Key: { id },
		UpdateExpression: "set order = :o",
		ExpressionAttributeValues: {
			":o": orders,
		},
	};

	return new Promise((res, rej) => {
		database.update(params, err => {
			if (err) {
				rej(err);
			} else {
				res();
			}
		});
	});
}
