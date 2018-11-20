import AWS from 'aws-sdk';

const database = process.env.IS_OFFLINE
	? new AWS.DynamoDB.DocumentClient({
			region: "localhost",
			endpoint: "http://localhost:8000",
	  })
	: new AWS.DynamoDB.DocumentClient();

export default database;

export const gameTable: string = process.env.GAMES_TABLE || "";
