export interface LoadByEmail<T> {
  loadByEmail: (email: string) => Promise<T>
}