import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService'

class ForgotPasswordController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body

      const sendForgotPasswordEmail = container.resolve(
        SendForgotPasswordEmailService
      )

      await sendForgotPasswordEmail.execute({ email })

      return res.status(204).json()
    } catch (err) {
      next(err)
    }
  }
}

export default ForgotPasswordController
