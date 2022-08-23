export interface RefreshTokenRepository {
  refresh: (token: string, id: string) => Promise<void>
}
