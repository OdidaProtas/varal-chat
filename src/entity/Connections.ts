import {AfterUpdate, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import Chat from "./Chat";

export enum Status {
    IS_GRANTED = "is_granted",
    IS_PENDING = "is_pending",
    IS_REJECTED = "is_rejected"
}

@Entity()
export default class Connections {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    partyA: number;

    @Column()
    partyB: number;

    @OneToOne(type => Chat, chat => chat.connection)
    @JoinColumn()
    chat: Chat;

    @Column({
        type: "enum",
        default: Status.IS_PENDING,
        enum: Status
    })
    status: Status;

    @AfterUpdate()
    async createEmptyChat() {
       await console.log("autored")
    }
}
