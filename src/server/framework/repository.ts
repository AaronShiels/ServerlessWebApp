import { DynamoDB } from "aws-sdk";
import IInventory from "../../common/contracts/IInventory";

const database = new DynamoDB.DocumentClient(process.env.IS_OFFLINE ? { region: "localhost", endpoint: "http://localhost:8000" } : undefined);

const tableName: string = process.env.TABLE || "";

export function getInventory(id: string): Promise<IInventory | undefined> {
	const params = { TableName: tableName, Key: { id } };

	return new Promise<IInventory>((res, rej) => {
		database.get(params, (err, data) => {
			if (err) {
				rej(err);
			} else {
				res(data.Item as IInventory);
			}
		});
	});
}

export function createInventory(inventory: IInventory): Promise<void> {
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

export function updateInventory({ id, orders }: IInventory): Promise<void> {
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
