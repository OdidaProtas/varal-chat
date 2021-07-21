import {MigrationInterface, QueryRunner} from "typeorm";

export class dev1624352307153 implements MigrationInterface {
    name = 'dev1624352307153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_cc7ebffb22f5014bf54ae320a43"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_c9d09209c4fbbe8cae26d0dd25c"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "partyAId"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "partyBId"`);
        await queryRunner.query(`CREATE TYPE "connections_status_enum" AS ENUM('is_granted', 'is_pending', 'is_rejected')`);
        await queryRunner.query(`ALTER TABLE "connections" ADD "status" "connections_status_enum" NOT NULL DEFAULT 'is_pending'`);
        await queryRunner.query(`ALTER TABLE "connections" ADD "chatId" integer`);
        await queryRunner.query(`ALTER TABLE "connections" ADD CONSTRAINT "UQ_875bf1367d60c3d321d5ee11bd3" UNIQUE ("chatId")`);
        await queryRunner.query(`ALTER TABLE "chat" ADD "connectionId" integer`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "UQ_9dc271dad92dca6617381b969f3" UNIQUE ("connectionId")`);
        await queryRunner.query(`ALTER TABLE "connections" ADD CONSTRAINT "FK_875bf1367d60c3d321d5ee11bd3" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_9dc271dad92dca6617381b969f3" FOREIGN KEY ("connectionId") REFERENCES "connections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_9dc271dad92dca6617381b969f3"`);
        await queryRunner.query(`ALTER TABLE "connections" DROP CONSTRAINT "FK_875bf1367d60c3d321d5ee11bd3"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "UQ_9dc271dad92dca6617381b969f3"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "connectionId"`);
        await queryRunner.query(`ALTER TABLE "connections" DROP CONSTRAINT "UQ_875bf1367d60c3d321d5ee11bd3"`);
        await queryRunner.query(`ALTER TABLE "connections" DROP COLUMN "chatId"`);
        await queryRunner.query(`ALTER TABLE "connections" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "connections_status_enum"`);
        await queryRunner.query(`ALTER TABLE "chat" ADD "partyBId" integer`);
        await queryRunner.query(`ALTER TABLE "chat" ADD "partyAId" integer`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_c9d09209c4fbbe8cae26d0dd25c" FOREIGN KEY ("partyBId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_cc7ebffb22f5014bf54ae320a43" FOREIGN KEY ("partyAId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
