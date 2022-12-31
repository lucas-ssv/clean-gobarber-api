import { HttpRequest } from '../../protocols/http'

export const mockAvatarRequest = (): HttpRequest => ({
  file: {
    name: 'any_name',
    url: 'any_url'
  }
})