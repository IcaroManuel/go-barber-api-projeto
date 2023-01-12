import { getHours, isAfter } from 'date-fns'
import { injectable, inject } from 'tsyringe'
import IAppoimentsRepository from '../repositories/IAppointmnetsRepository'

interface IRequest {
  provider_id: string
  day: number
  month: number
  year: number
}

type IResponse = Array<{
  hour: number
  available: boolean
}>

@injectable()
export default class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appoinmentsRepository: IAppoimentsRepository
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<IResponse> {
    const appointments =
      await this.appoinmentsRepository.findAllInDayFromProviderDTO({
        provider_id,
        year,
        month,
        day,
      })
    const hourStart = 8
    const currentDate = new Date(Date.now())
    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart
    )

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour
      )

      const compareDate = new Date(year, month - 1, day, hour)

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      }
    })

    return availability
  }
}
