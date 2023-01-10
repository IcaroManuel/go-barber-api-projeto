import { container } from 'tsyringe'

import '@modules/users/providers/index'
import '@shared/container/providers'

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'

import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokenRepository'
import UsersTokensRepository from '@modules/users/infra/typeorm/repositories/UsersTokensRepository'
import IAppoimentsRepository from '@modules/appointments/repositories/IAppointmnetsRepository'
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository'
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository'

container.registerSingleton<IAppoimentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository
)

container.registerSingleton<INotificationRepository>(
  'NotificationsRepository',
  NotificationsRepository
)
