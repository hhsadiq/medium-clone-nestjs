import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTotalClapsToArticle1731004747005 implements MigrationInterface {
  name = 'AddTotalClapsToArticle1731004747005';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "article" ADD "totalClaps" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "totalClaps"`);
  }
}
