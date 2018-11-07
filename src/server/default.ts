import express from 'express';
import serverless from 'serverless-http';

const app = express();

app.get("/", function(req, res) {
	res.send("Default");
});

export const handler = serverless(app);
