import { newDb } from 'pg-mem'
import { DataSource } from 'typeorm'

const db = newDb()
export const connect = async (entity: any): Promise<DataSource> => {
  db.public.registerFunction({
    implementation: () => 'test',
    name: 'current_database'
  })
  const got = await db.adapters.createTypeormDataSource({
    type: 'postgres',
    entities: [entity]
  })
  return got
}
