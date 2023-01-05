import { randomUUID } from 'crypto'
import { getDate, getMonth, getYear, isEqual } from 'date-fns'

import IAppoimentsRepository from '../IAppointmnetsRepository'
import Appointment from '@modules/appoitments/infra/typeorm/entities/Appointment'
import IFindAllInMonthFromProvider from '@modules/appoitments/dtos/IFindAllInMonthFromProviderDTO'
import IFindAllInDayFromProviderDTO from '@modules/appoitments/dtos/IFindAllInDayFromProviderDTO'
import ICreateAppointmentDTO from '@modules/appoitments/dtos/ICreateAppointmentDTO'

export default class AppointmentsRepository implements IAppoimentsRepository {
  private appointments: Appointment[] = []

  public async findByDate(
    date: Date,
    provider_id: string
  ): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment =>
        isEqual(appointment.date, date) &&
        appointment.provider_id === provider_id
    )

    return findAppointment
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProvider): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
    )

    return appointments
  }

  public async findAllInDayFromProviderDTO({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
    )

    return appointments
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()

    Object.assign(appointment, { id: randomUUID(), date, provider_id, user_id })

    this.appointments.push(appointment)

    return appointment
  }
}
