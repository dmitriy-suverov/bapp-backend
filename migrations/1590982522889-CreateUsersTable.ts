import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUsersTable1590982522889 implements MigrationInterface {
    name = 'CreateUsersTable1590982522889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, "deletedAt" bigint, "login" character varying NOT NULL, "email" character varying NOT NULL, "passwordHash" character varying NOT NULL, "isConfirmed" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`, undefined);
    }

}
