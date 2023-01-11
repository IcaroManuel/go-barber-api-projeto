import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'
import { instanceToPlain } from 'class-transformer'

import ListProviderService from '@modules/appointments/services/ListProvidersService'

export default class ProvidersControllers {
  public async index(request: Request, response: Response, next: NextFunction) {
    try {
      const user_id = request.user.id

      const listProviders = container.resolve(ListProviderService)

      const providers = await listProviders.execute({
        user_id,
      })

      return response.json(instanceToPlain(providers))
    } catch (err) {
      next(err)
    }
  }
}
