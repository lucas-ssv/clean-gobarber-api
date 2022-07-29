import 'dotenv/config'
import { DataSource } from 'typeorm'

export const Db = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || '127.0.0.1',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'gobarber',
  synchronize: true,
  logging: true,
  entities: ['src/infra/db/database/entities/**/*.ts'],
  migrations: ['src/infra/db/database/migrations/**/*.ts']
})
