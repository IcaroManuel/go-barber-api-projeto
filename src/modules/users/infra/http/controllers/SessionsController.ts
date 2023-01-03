import { Request, Response } from 'express'
import { instanceToPlain } from 'class-transformer'

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'
import { container } from 'tsyringe'

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body

      const authenticateUserService = container.resolve(AuthenticateUserService)

      const { user, token } = await authenticateUserService.execute({
        email,
        password,
      })

      return response.json(instanceToPlain(user), token)
    } catch ({ message }) {
      return response.status(400).json({
        status: 'error',
        message: message,
      })
    }
  }
}
