import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createSchedules1662387958010 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'schedules',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid'
      }, {
        name: 'description',
        type: 'varchar'
      }, {
        name: 'scheduled_time',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP'
      }, {
        name: 'account_id',
        type: 'uuid'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP'
      }],
      foreignKeys: [{
        columnNames: ['account_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'schedules',
        onDelete: 'CASCADE'
      }]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('schedules')
  }
}
