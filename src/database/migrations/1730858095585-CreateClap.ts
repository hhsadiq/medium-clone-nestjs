import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateClap1730858095585 implements MigrationInterface {
  name = 'CreateClap1730858095585';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "clap" ("user_id" integer NOT NULL, "article_id" uuid NOT NULL, "counter" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d1b9b4ca1b4b632d4d0e3921c9f" PRIMARY KEY ("user_id", "article_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "clap" ADD CONSTRAINT "FK_3cb604899b8e05eadda01ab50c9" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "clap" ADD CONSTRAINT "FK_2d7053ea1c1094fc273a59a8d17" FOREIGN KEY ("article_id") REFERENCES "article"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "clap" DROP CONSTRAINT "FK_2d7053ea1c1094fc273a59a8d17"`,
    );
    await queryRunner.query(
      `ALTER TABLE "clap" DROP CONSTRAINT "FK_3cb604899b8e05eadda01ab50c9"`,
    );
    await queryRunner.query(`DROP TABLE "clap"`);
  }
}
