import {getRepository} from "typeorm";
import Connections from "../entity/Connections";
import {NextFunction, Request, Response} from "express";
import ref from "./ref";
import {User} from "../entity/User";

export default class ConnectionsController {

    connectionRepository = getRepository(Connections);
    userRepository = getRepository(User);

    async save(request: Request, response: Response, next: NextFunction, io: any) {

        const {partyA, partyB} = request.body;

        const users = await this.userRepository.find();
        const connections = await this.connectionRepository.findOne({partyA: partyA, partyB: partyB});
        const reverseConnections = await this.connectionRepository.findOne({partyA: partyA, partyB: partyB});

        if (connections || reverseConnections) return response.status(403);

        const [data, error] = await ref(this.connectionRepository.save(request.body));

        console.log(io)

        return error ? response.sendStatus(403) : [data].map(data => {
            return ({...data, user: users.filter(user => user.id == data.partyB)[0]});
        }).map(data => ({...data.user, status: data.status, initializer: data.partyA, connection: data.id}))[0];

    }

    async update(request: Request, response: Response, next: NextFunction) {
        const [data, error] = await ref(this.connectionRepository.update(request.params.id, request.body));
        return error ? response.sendStatus(403) : data;
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const [data, error] = await ref(this.connectionRepository.delete(request.params.id));
        return error ? request.sendStatus(403) : data;
    }

    async all(request: Request, response: Response, next: NextFunction) {

        const {id} = request.params;
        const [data, error] = await ref(this.connectionRepository.find());

        if (error) response.sendStatus(404);
        const users = await this.userRepository.find();

        return data
            .filter(data => (data.partyB == id || data.partyA == id))
            .map(data => {
                if (data.partyA == id) return ({...data, user: users.filter(user => user.id == data.partyB)[0]});
                return ({...data, user: users.filter(user => user.id == data.partyA)[0]});
            }).map(data => ({...data.user, status: data.status, initializer: data.partyA, connection: data.id}));
    }
}

