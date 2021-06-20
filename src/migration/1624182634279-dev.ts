import {MigrationInterface, QueryRunner} from "typeorm";

export class dev1624182634279 implements MigrationInterface {
    name = 'dev1624182634279'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "email" TO "image"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "image" TO "email"`);
    }

}
