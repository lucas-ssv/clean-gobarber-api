import 'dotenv/config'
import { DataSource } from 'typeorm'

export const Db = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: true,
  entities: ['src/infra/db/database/entities/**/*.ts'],
  migrations: ['src/infra/db/database/migrations/**/*.ts']
})
