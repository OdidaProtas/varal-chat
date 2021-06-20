import {getRepository} from "typeorm";
import Messages from "../entity/Messages";
import {Response, Request, NextFunction} from "express";
import ref from "./ref";

export default class MessageController {

    messageRepository = getRepository(Messages);

    async all(request: Request, response: Response, next: NextFunction) {
        const [data, error] = await ref(this.messageRepository.find());
        return error ? response.sendStatus(404) : data;
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const [data, error] = await ref(this.messageRepository.findOne(request.params.id));
        return error ? response.sendStatus(404) : data;
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const [data, error] = await ref(this.messageRepository.save(request.body));
        return error ? response.sendStatus(403) : data;
    }

    async remove(request: Request, response: Response, next: NextFunction) {

    }
}
