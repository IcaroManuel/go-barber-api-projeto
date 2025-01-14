import { getDate, getDaysInMonth, isAfter } from 'date-fns'
import { inject, injectable } from 'tsyringe'
import IAppoimentsRepository from '../repositories/IAppointmnetsRepository'

interface IRequest {
  provider_id: string
  month: number
  year: number
}

type IResponse = Array<{
  day: number
  available: boolean
}>

@injectable()
export default class ListProvidersMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppoimentsRepository
  ) {}
  public async execute({
    provider_id,
    year,
    month,
  }: IRequest): Promise<IResponse> {
    const appointments =
      await this.appointmentsRepository.findAllInMonthFromProvider({
        provider_id,
        year,
        month,
      })

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1))
    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1
    )
    const availability = eachDayArray.map(day => {
      const compareDate = new Date(year, month - 1, day, 23, 59, 59)

      const appointmentsInDay = appointments.filter(appointments => {
        return getDate(appointments.date) === day
      })
      return {
        day,
        available:
          isAfter(compareDate, Date.now()) && appointmentsInDay.length < 10,
      }
    })
    return availability
  }
}
