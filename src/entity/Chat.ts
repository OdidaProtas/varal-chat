import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";

import Messages from "./Messages";
import Connections from "./Connections";

@Entity()
export default class Chat {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => Connections, connection => connection.chat)
    @JoinColumn()
    connection: Connections;

    @OneToMany(type => Messages, messages => messages.chat)
    @JoinTable()
    messages: Messages[];

}

