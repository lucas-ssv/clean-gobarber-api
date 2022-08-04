import { HttpRequest } from '../../protocols/http'

export const mockSignUpRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password',
    isBarber: false
  }
})
