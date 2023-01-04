import { inject, injectable } from 'tsyringe'
import { instanceToPlain } from 'class-transformer'

import Appointment from '../infra/typeorm/entities/Appointment'

import IAppoimentsRepository from '../repositories/IAppointmnetsRepository'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

interface IRequest {
  provider_id: string
  day: number
  month: number
  year: number
}

@injectable()
export default class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private apponintmentsRepository: IAppoimentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    provider_id,
    day,
    year,
    month,
  }: IRequest): Promise<Appointment[]> {
    const cacheKey = `provider-appoinment: ${provider_id}:${year}-${month}-${day}`
    let appoinments = await this.cacheProvider.recover<Appointment[]>(cacheKey)
    if (!appoinments) {
      appoinments =
        await this.apponintmentsRepository.findAllInDayFromProviderDTO({
          provider_id,
          year,
          month,
          day,
        })
      await this.cacheProvider.save(cacheKey, instanceToPlain(appoinments))
    }
    return appoinments
  }
}
