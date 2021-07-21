import ref from "./ref";
import {getRepository} from "typeorm";
import Chat from "../entity/Chat";
import {NextFunction, Request, response, Response} from "express";

export default class ChatController {

    chatRepository = getRepository(Chat);

    async all(request: Request, response: Response, next: NextFunction) {
        const [data, error] = await ref(this.chatRepository.find());
        return error ? response.sendStatus(404) : data;
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const [data, error] = await ref(this.chatRepository.findOne(request.params.id));
        return error ? response.sendStatus(404) : data;
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const [data, error] = await ref(this.chatRepository.save(request.body));
        return error ? response.sendStatus(403) : data;
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let chatToRemove = await this.chatRepository.findOne(request.params.id);
        await this.chatRepository.remove(chatToRemove);
    }

}
