import database, { gameTable } from '../utilities/database';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { IGame } from '.';

export function getGame(gameKey: string): Promise<IGame | undefined> {
	const params: DocumentClient.QueryInput = {
		TableName: gameTable,
		IndexName: "gameKeyIndex",
		KeyConditionExpression: "gameKey = :gameKey",
		ExpressionAttributeValues: {
			":gameKey": gameKey,
		},
	};

	return new Promise<IGame>((res, rej) => {
		database.query(params, (err, data) => {
			if (err) {
				rej(err);
			} else if (!data.Items || !data.Items.length) {
				res();
			} else {
				const games: IGame[] = data.Items.map(i => i as IGame);
				res(games[0]);
			}
		});
	});
}
