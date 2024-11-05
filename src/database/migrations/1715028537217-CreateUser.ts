import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1715028537217 implements MigrationInterface {
  name = 'CreateUser1715028537217';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "role" (
        "id" integer NOT NULL,
        "name" character varying NOT NULL,
        CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")
      )`,
    );
    await queryRunner.query(
      `CREATE TABLE "status" (
        "id" integer NOT NULL,
        "name" character varying NOT NULL,
        CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id")
      )`,
    );
    await queryRunner.query(
      `CREATE TABLE "file" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "path" character varying NOT NULL,
        CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id")
      )`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" (
        "id" SERIAL NOT NULL,
        "email" character varying,
        "username" character varying,
        "password" character varying,
        "provider" character varying NOT NULL DEFAULT 'email',
        "social_id" character varying,
        "first_name" character varying,
        "last_name" character varying,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "photo_id" uuid,
        "role_id" integer,
        "status_id" integer,
        CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
        CONSTRAINT "UQ_fa456b9e1d3d9e9a1a1c4e2d9c2" UNIQUE ("username"),
        CONSTRAINT "REL_75e2be4ce11d447ef43be0e374" UNIQUE ("photo_id"),
        CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
      )`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f" ON "user" ("social_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_58e4dbff0e1a32a9bdc861bb29" ON "user" ("first_name")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f0e1b4ecdca13b177e2e3a0613" ON "user" ("last_name")`,
    );
    await queryRunner.query(
      `CREATE TABLE "session" (
        "id" SERIAL NOT NULL,
        "hash" character varying NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "user_id" integer,
        CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id")
      )`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "session" ("user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" 
        ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" 
        FOREIGN KEY ("photo_id") REFERENCES "file"("id") 
        ON DELETE NO ACTION 
        ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" 
        ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" 
        FOREIGN KEY ("role_id") REFERENCES "role"("id") 
        ON DELETE NO ACTION 
        ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" 
        ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" 
        FOREIGN KEY ("status_id") REFERENCES "status"("id") 
        ON DELETE NO ACTION 
        ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" 
        ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" 
        FOREIGN KEY ("user_id") REFERENCES "user"("id") 
        ON DELETE NO ACTION 
        ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ddc5"`,
    );
    await queryRunner.query(`DROP TABLE "session"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f0e1b4ecdca13b177e2e3a0613"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_58e4dbff0e1a32a9bdc861bb29"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9bd2fe7a8e694dedc4ec2f666f"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "file"`);
    await queryRunner.query(`DROP TABLE "status"`);
    await queryRunner.query(`DROP TABLE "role"`);
  }
}
