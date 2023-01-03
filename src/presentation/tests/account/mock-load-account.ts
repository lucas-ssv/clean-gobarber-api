import { HttpRequest } from '../../protocols/http'

export const mockLoadAccountRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com'
  }
})