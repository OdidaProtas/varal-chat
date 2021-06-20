import {Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import Messages from "./Messages";

@Entity()
export default class Chat {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    partyA: User;

    @ManyToOne(() => User)
    partyB: User;

    @OneToMany(type => Messages, messages => messages.chat)
    @JoinTable()
    messages: Messages[];

}

