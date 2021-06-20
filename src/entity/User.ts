import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany, JoinTable} from "typeorm";
import * as bcrypt from "bcrypt";
import Chat from "./Chat";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    username: string;

    @Column()
    password: string;

    @Column({
        nullable: true
    })
    image: string;

    @OneToMany(() => Chat, chat => chat.partyA)
    @JoinTable()
    myChats: Chat[];

    @OneToMany(() => Chat, chat => chat.partyB)
    @JoinTable()
    inbox: Chat[];

    @BeforeInsert()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

}
