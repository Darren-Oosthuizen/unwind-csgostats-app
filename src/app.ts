import express from "express";
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import debug from 'debug';
import cors from 'cors';
import {CommonRoutesConfig} from "./route/routes.config";
import * as http from "http";
import {PlayerRoutes} from "./route/players.routes.config";
import * as path from "path";
import busboy from 'connect-busboy'; // middleware for form/file upload

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const PORT = process.env.PORT || 5000
const routes: CommonRoutesConfig[] = [];
const debugLog: debug.IDebugger = debug('app');

app.use(express.static(path.join(__dirname, 'public')))

// Configure Express to use EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// here we are adding middleware to parse all incoming requests as JSON
// app.use(express.json());
app.use(busboy());

// here we are adding middleware to allow cross-origin requests
app.use(cors());

// here we are preparing the expressWinston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js
const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({all: true})
    ),
};

if (!process.env.DEBUG) {
    loggerOptions.meta = false; // when not debugging, log requests as one-liners
}

// initialize the logger with the above configuration
app.use(expressWinston.logger(loggerOptions));

if (!process.env.DEBUG) {
    loggerOptions.meta = false; // when not debugging, log requests as one-liners
}

routes.push(new PlayerRoutes(app));

app.listen( PORT,() => {
    routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });
    // our only exception to avoiding console.log(), because we
    // always want to know when the server is done starting up
    debugLog('Example app listening on port 3000!');
});
