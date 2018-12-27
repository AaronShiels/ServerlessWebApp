import AWS from 'aws-sdk';
import GameAction from '../../common/game/actions';
import guid from '../../common/utilities/guid';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { IGameState } from '../../common/game';
import { initialState } from '../../common/game/reducer';

export interface IGameData {
	id: string;
	gameKey: string;
	actions: GameAction[];
	state: IGameState;
}

export function newGame(): IGameData {
	const id: string = guid();

	return {
		id,
		gameKey: id.substring(0, 4),
		actions: [],
		state: initialState,
	};
}

const database: DocumentClient = process.env.IS_OFFLINE
	? new AWS.DynamoDB.DocumentClient({
			region: "localhost",
			endpoint: "http://localhost:8000",
	  })
	: new AWS.DynamoDB.DocumentClient();

const gameTable: string = process.env.GAMES_TABLE || "";

export function getGameByKey(gameKey: string): Promise<IGameData | undefined> {
	const params: DocumentClient.QueryInput = {
		TableName: gameTable,
		IndexName: "gameKeyIndex",
		KeyConditionExpression: "gameKey = :gameKey",
		ExpressionAttributeValues: {
			":gameKey": gameKey,
		},
	};

	return new Promise<IGameData>((res, rej) => {
		database.query(params, (err, data) => {
			if (err) {
				rej(err);
			} else if (!data.Items || !data.Items.length) {
				res();
			} else {
				const games: IGameData[] = data.Items.map(i => i as IGameData);
				res(games[0]);
			}
		});
	});
}

export function updateGameById(updatedGameData: IGameData): Promise<void> {
	const params: DocumentClient.UpdateItemInput = {
		TableName: gameTable,
		Key: {
			id: updatedGameData.id,
		},
		UpdateExpression: "set state = :s, actions = :a",
		ExpressionAttributeValues: {
			":s": updatedGameData.state,
			":a": updatedGameData.actions,
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
