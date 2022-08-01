import { Db } from '../ormconfig'
import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm'

let client = null as DataSource

export const DbHelper = {
  connect: async (): Promise<void> => {
    client = await Db.initialize()
  },
  disconnect: async (): Promise<void> => {
    await client.destroy()
    client = null
  },
  getRepository: async (entity: EntityTarget<ObjectLiteral>): Promise<Repository<ObjectLiteral>> => {
    if (!client) {
      await DbHelper.connect()
    }
    return client.getRepository(entity)
  }
}
