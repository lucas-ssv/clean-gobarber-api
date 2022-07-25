export default {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'gobarber',
  syncronize: true,
  logging: true,
  entities: ['src/infra/db/database/entities/*.ts'],
  migrations: ['src/infra/db/database/migrations/*.ts'],
  cli: {
    entitiesDir: 'src/infra/db/database/entities',
    migrationsDir: 'src/infra/db/database/migrations'
  }
}