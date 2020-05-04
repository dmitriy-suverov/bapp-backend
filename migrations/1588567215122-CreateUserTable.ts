import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserTable1588567215122 implements MigrationInterface {
    name = 'CreateUserTable1588567215122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, "deletedAt" bigint NOT NULL, "login" character varying NOT NULL, "email" character varying NOT NULL, "passwordHash" character varying NOT NULL, "isConfirmed" boolean NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`, undefined);
    }

}
