import { HttpRequest } from '../../protocols/http'

export const mockLoadAccountsRequest = (): HttpRequest => ({
  body: {
    isBarber: true
  }
})