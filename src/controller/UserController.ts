import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import ref from "./ref";

export class UserController {

    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        const [data, error] = await ref(this.userRepository.find())
        return error ? response.sendStatus(403) : data;
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {

        const {password} = request.body;
        request.body["password"] = bcrypt.hashSync(password, 8);

        const [data, error] = await ref(this.userRepository.save(request.body));
        return error ? response.sendStatus(403) : data;
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }

    async login(request: Request, response: Response, next: NextFunction) {

        const {username, password} = request.body;
        const [data, error] = await ref(this.userRepository.findOne({username: username}));

        if (error || data == undefined) return response.sendStatus(404);
        if (bcrypt.compareSync(password, data.password)) return response.send({token: generateToken(data)});
        return response.sendStatus(403);
    }

    async frisk(request: Request, response: Response, next: NextFunction) {

        const accessToken = request.headers["access_token"];

        if (!accessToken.startsWith("Bearer ") || accessToken == null || accessToken == undefined)
            return response.sendStatus(400);

        return jwt.verify(accessToken.split(" ")[1], process.env.jwt_secret as string, async (err: any, user: any) => {
            const [data, error] = await ref(getRepository(User).findOne(user.id));
            request.user = data;
            if (error || err) return response.sendStatus(403);
            next();
        })
    }

    async pass(request: Request, response: Response, next: NextFunction) {
        next();
    }


}


const generateToken = (data: User) => {
    const decode = {
        id: data.id,
        username: data.username,
        image: data.image
    }

    const secret = process.env.jwt_secret;
    return jwt.sign(decode, secret);
}
