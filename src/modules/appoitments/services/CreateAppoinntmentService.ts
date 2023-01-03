import { injectable, inject } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import IAppoimentsRepository from '../repositories/IAppointmnetsRepository'
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository'

interface IRequest {
  provider_id: string
  user_id: string
  date: Date
}

@injectable()
export default class CreateAppointmentService {
  constructor(
    @inject('AppontmentsRepository')
    private appoinmentsRepository: IAppoimentsRepository,
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}
}
