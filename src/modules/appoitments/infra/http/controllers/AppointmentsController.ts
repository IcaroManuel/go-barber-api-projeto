import { Request, Response } from 'express'
import { container } from 'tsyringe'


export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { provider_id, date } = request.body

    const parsedDate = date

    const createAppointment = container.resolve()

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
      user_id,
    })
    return response.json(appointment)
  }
}
