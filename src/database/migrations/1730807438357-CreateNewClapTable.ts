import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateArticleClapTable1730807438357 implements MigrationInterface {
  name = 'CreateArticleClapTable1730807438357';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "article_clap" CASCADE`);

    await queryRunner.query(
      `CREATE TABLE "article_clap" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "article_id" uuid NOT NULL,
        "user_id" integer NOT NULL,
        "counter" integer NOT NULL DEFAULT '0',
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_e0bb771483d49f34572c24039e0" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_8b17e7ed49c31b89fc7e14b7517" UNIQUE ("article_id", "user_id")
      )`,
    );

    // Add the foreign key constraints
    await queryRunner.query(
      `ALTER TABLE "article_clap" ADD CONSTRAINT "FK_1f294629f1a7a1283754ab15049" 
       FOREIGN KEY ("article_id") REFERENCES "article"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "article_clap" ADD CONSTRAINT "FK_04b7b1c4f32b90521da0472a008" 
       FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the foreign key constraints first
    await queryRunner.query(
      `ALTER TABLE "article_clap" DROP CONSTRAINT "FK_04b7b1c4f32b90521da0472a008"`,
    );

    await queryRunner.query(
      `ALTER TABLE "article_clap" DROP CONSTRAINT "FK_1f294629f1a7a1283754ab15049"`,
    );

    // Drop the table
    await queryRunner.query(`DROP TABLE "article_clap"`);
  }
}
