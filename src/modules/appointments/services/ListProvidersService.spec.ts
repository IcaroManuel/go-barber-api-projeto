import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvicer'
import ListProviderService from './ListProvidersService'

let fakeUsersRepository: FakeUsersRepository
let fakeCacheProvicer: FakeCacheProvider

let listProviders: ListProviderService

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeCacheProvicer = new FakeCacheProvider()

    listProviders = new ListProviderService(
      fakeUsersRepository,
      fakeCacheProvicer
    )
  })

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'user01',
      email: 'user01@test.com',
      password: '123456',
    })

    const user2 = await fakeUsersRepository.create({
      name: 'user02',
      email: 'user02@test.com',
      password: '123456',
    })

    const loggedUser = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@test.com',
      password: '123456',
    })

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    })

    expect(providers).toEqual([user1, user2])
  })
})
