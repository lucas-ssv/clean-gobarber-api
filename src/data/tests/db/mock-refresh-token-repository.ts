import { RefreshTokenRepository } from '../../protocols/db/refresh-token-repository'

export class RefreshTokenRepositoryStub implements RefreshTokenRepository {
  async refreshToken (token: string, id: string): Promise<void> {}
}
