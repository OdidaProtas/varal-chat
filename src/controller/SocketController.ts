import {getRepository} from "typeorm";
import {User} from "../entity/User";
import ref from "./ref";
import Messages from "../entity/Messages";

const activeUsers = {};
const rooms = {};

export default class SocketController {

    async client(socket: any) {

        socket.on("new_user", async data => {

            const {id} = data;
            const [user, error] = await ref(getRepository(User).findOne({id: id}));

            if (user != null || user != undefined) {
                activeUsers[socket.id] = user;
                socket.broadcast.emit("user_connected", user);
            }
        });

        socket.on("send_chat_message", async data => {
            const [res, error] = await ref(getRepository(Messages).save(data));
            const [recipient, err] = await ref(getRepository(User).findOne(parseInt(data.recipient)));
            if (res && recipient) {
                socket.emit("chat_message", {...res, recipient: recipient});
            }
        });

        socket.on("disconnect", () => {
            socket.broadcast.emit("user_disconnected", activeUsers[socket.id]);
            delete activeUsers[socket.id];
        });
    }


}
