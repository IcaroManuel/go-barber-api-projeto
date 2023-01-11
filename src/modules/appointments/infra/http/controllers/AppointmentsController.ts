import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'

export default class AppointmentsController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const user_id = request.user.id
      const { provider_id, date } = request.body

      const parsedDate = date

      const createAppointment = container.resolve(CreateAppointmentService)

      const appointment = await createAppointment.execute({
        date: parsedDate,
        provider_id,
        user_id,
      })
      return response.json(appointment)
    } catch (err) {
      next(err)
    }
  }
}
