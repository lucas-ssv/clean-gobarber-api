import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createAccounts1658857013094 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'accounts',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid'
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'email',
        type: 'varchar',
        isUnique: true
      }, {
        name: 'password',
        type: 'varchar'
      }, {
        name: 'is_barber',
        type: 'bool'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('accounts')
  }
}
