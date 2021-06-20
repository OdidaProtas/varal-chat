import "reflect-metadata";

import * as express from "express";
import * as bodyParser from "body-parser";
import * as http from "http";
import * as cors from "cors";

import {Request, Response} from "express";
import {Routes} from "./routes";
import {createConnection} from "typeorm";


createConnection().then(async () => {

    // create express app
    const app = express();

    const server = http.createServer(app);

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));


    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });


    server.listen(process.env.PORT);

    console.log(`Express server has started on port ${process.env.PORT}`);

}).catch(error => console.log(error));
