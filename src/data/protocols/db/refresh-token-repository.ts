export interface RefreshTokenRepository {
  refreshToken: (id: string, token: string) => Promise<void>
}
