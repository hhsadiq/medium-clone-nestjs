import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddClapCountInArticle1730912500959 implements MigrationInterface {
  name = 'AddClapCountInArticle1730912500959';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "article" ADD "clap_count" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "clap_count"`);
  }
}
