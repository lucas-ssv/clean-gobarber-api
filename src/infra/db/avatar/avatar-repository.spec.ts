import { AvatarRepository } from './avatar-repository'

describe('AvatarRepository', () => {
  test('Should add an avatar on add success', async () => {
    const sut = new AvatarRepository()
    const avatar = await sut.add({
      name: 'any_name',
      url: 'any_url'
    })
    expect(avatar).toBeTruthy()
    expect(avatar.name).toBe('any_name')
    expect(avatar.url).toBe('any_url')
  })
})