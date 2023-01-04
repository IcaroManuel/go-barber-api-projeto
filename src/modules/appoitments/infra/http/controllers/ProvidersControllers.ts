import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { instanceToPlain } from 'class-transformer'

import ListProviderService from '@modules/appoitments/services/ListProviderService'

export default class ProvidersControllers {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const listProviders = container.resolve(ListProviderService)

    const providers = await listProviders.execute({
      user_id,
    })

    return response.json(instanceToPlain(providers))
  }
}
