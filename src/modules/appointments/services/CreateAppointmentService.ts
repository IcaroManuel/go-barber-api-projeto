import { injectable, inject } from 'tsyringe'
import { getHours, isBefore, format, startOfHour } from 'date-fns'

import AppError from '@shared/errors/AppError'
import Appointment from '../infra/typeorm/entities/Appointment'

import IAppoimentsRepository from '../repositories/IAppointmnetsRepository'
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

interface IRequest {
  provider_id: string
  user_id: string
  date: Date
}

@injectable()
export default class CreateAppointmentService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
    @inject('AppointmentsRepository')
    private appoinmentsRepository: IAppoimentsRepository
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appoinmentDate = startOfHour(date)

    if (isBefore(appoinmentDate, Date.now())) {
      throw new AppError("you can't create an appointment on a past date.")
    }
    if (user_id === provider_id) {
      throw new AppError("You can't create appointment with yourself")
    }
    if (getHours(appoinmentDate) < 8 || getHours(appoinmentDate) > 17) {
      throw new AppError('You can only create appointment betwenn 8am and 5pm')
    }

    const findAppointmentInSameDate =
      await this.appoinmentsRepository.findByDate(appoinmentDate, provider_id)

    if (findAppointmentInSameDate) {
      throw new AppError('this appointment is already booked.')
    }

    const appoinment = await this.appoinmentsRepository.create({
      provider_id,
      user_id,
      date: appoinmentDate,
    })
    const dateFormated = format(appoinmentDate, "dd/mm/yyyy 'às' HH:mm'h'")

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para o dia ${dateFormated}`,
    })

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(
        appoinmentDate,
        'yyyy/M/d'
      )}`
    )
    return appoinment
  }
}
