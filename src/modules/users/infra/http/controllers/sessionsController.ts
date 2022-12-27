import { Request, Response } from 'express'

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const authenticateUserService = new AuthenticateUserService()
      const { email, password } = request.body

      const { user, token } = await authenticateUserService.execute({
        email,
        password,
      })

      return response.json({ user: user, token })
    } catch ({ message }) {
      return response.status(400).json({
        status: 'error',
        message: message,
      })
    }
  }
}
