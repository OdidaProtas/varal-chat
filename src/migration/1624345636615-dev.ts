import {MigrationInterface, QueryRunner} from "typeorm";

export class dev1624345636615 implements MigrationInterface {
    name = 'dev1624345636615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "connections" ("id" SERIAL NOT NULL, "partyA" integer NOT NULL, "partyB" integer NOT NULL, CONSTRAINT "PK_0a1f844af3122354cbd487a8d03" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "connections"`);
    }

}
