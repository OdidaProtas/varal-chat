import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import Chat from "./Chat";

@Entity()
export default class Messages {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;


    @Column({
        default: false
    })
    isRead: boolean;

    @Column({
        type: "date",
        default: "now"
    })
    timeStamp: string;

    @ManyToOne(() => Chat)
    chat: Chat;

    @ManyToOne(() => User)
    sender: User;

    @ManyToOne(() => User)
    recipient: User;
}
