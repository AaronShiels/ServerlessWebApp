import express from 'express';
import serverless from 'serverless-http';

const app = express();

app.get("/games", function(req, res) {
	res.send(["Game 1", "Game 2"]);
});

export const handler = serverless(app);
