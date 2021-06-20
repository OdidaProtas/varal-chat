import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert} from "typeorm";
import * as bcrypt from "bcrypt";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    image: string;

    @BeforeInsert()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }


}
