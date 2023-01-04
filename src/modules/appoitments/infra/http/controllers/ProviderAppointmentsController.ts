import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProviderAppointmentsService from '@modules/appoitments/services/ListProviderAppointmentsService'
import { instanceToPlain } from 'class-transformer'

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id
    const { day, month, year } = request.query

    const listProviderAppointmentsService = container.resolve(
      ListProviderAppointmentsService
    )

    const appoinments = await listProviderAppointmentsService.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    })

    return response.json(instanceToPlain(appoinments))
  }
}
