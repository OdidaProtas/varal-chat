import "reflect-metadata";

const globalAny: any = global;

import * as express from "express";
import * as bodyParser from "body-parser";
import * as http from "http";
import * as cors from "cors";

import {Request, Response} from "express";
import {Routes} from "./routes";
import {createConnection} from "typeorm";
import {UserController} from "./controller/UserController";
import SocketController from "./controller/SocketController";

const options = {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
}


createConnection().then(async () => {

    // create express app
    const app = express();

    const server = http.createServer(app);

    const io = require("socket.io")(server, options);


    // configure middleware
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    // request validation
    const intercept: Function = new UserController().frisk;
    const pass: Function = new UserController().pass;

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route,

            route.route == "/login" ? pass :
                route.route == "/users" && route.method == "post" ? pass : intercept,

            (req: Request, res: Response, next: Function) => {
                const result = (new (route.controller as any))[route.action](req, res, next, io);
                if (result instanceof Promise) {
                    result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

                } else if (result !== null && result !== undefined) {
                    res.json(result);
                }
            }
        )
        ;
    });


    io.on("connection", new SocketController().client);

    server.listen(process.env.PORT);

    console.log(`Express server has started on port ${process.env.PORT}`);

}).catch(error => console.log(error));
