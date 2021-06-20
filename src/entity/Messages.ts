import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import Chat from "./Chat";

@Entity()
export default class Messages {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;


    @Column()
    isRead: boolean;

    @Column({
        type: "date"
    })
    timeStamp: string;

    @ManyToOne(() => Chat)
    chat: Chat;

    @ManyToOne(() => User)
    sender: User;

    @ManyToOne(() => User)
    recipient: User;
}
