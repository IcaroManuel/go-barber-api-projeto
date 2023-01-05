import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO'
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO'
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO'
import Appointment from '../infra/typeorm/entities/Appointment'

export default interface IAppoimentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>
  findAllInMonthFromProvider(
    data: IFindAllInMonthFromProviderDTO
  ): Promise<Appointment[]>
  findAllInDayFromProviderDTO(
    data: IFindAllInDayFromProviderDTO
  ): Promise<Appointment[]>
}
