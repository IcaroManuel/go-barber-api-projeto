import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvicer'
import ListProviderAppointmentsService from './ListProviderAppointmentsService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let fakeCacheProvider: FakeCacheProvider
let listProviderAppointments: ListProviderAppointmentsService

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    fakeCacheProvider = new FakeCacheProvider()

    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider
    )
  })

  it('should be able to list the appointments on a specific day', async () => {
    const appoinment1 = await fakeAppointmentsRepository.create({
      provider_id: 'povider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    })

    const appoinment2 = await fakeAppointmentsRepository.create({
      provider_id: 'povider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    })
    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      year: 2020,
      month: 5,
      day: 20,
    })

    expect(appointments).toEqual([appoinment1, appoinment2])
  })
})
