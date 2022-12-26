export interface LoadByEmailRepository<T> {
  loadByEmail: (email: string) => Promise<T>
}