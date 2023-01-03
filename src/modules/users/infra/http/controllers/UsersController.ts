import { NextFunction, Request, response, Response } from 'express'
import { container } from 'tsyringe'
import { instanceToPlain } from 'class-transformer'

import { CreateUserService } from '@modules/users/services/CreateUserService'
import UsersRepository from '../../typeorm/repositories/UsersRepository'

export default class UsersController {
  async create(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const { name, email, password } = req.body

      const createUserService = container.resolve(CreateUserService)

      const user = await createUserService.execute({
        name,
        email,
        password,
      })

      return response.json(instanceToPlain(user))
    } catch ({ message }) {
      res.status(400).json({
        error: message,
      })
    }
  }

  async list(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const usersRepository = container.resolve(UsersRepository)
      const users = await usersRepository.list()

      return response.json(instanceToPlain(users))
    } catch (err) {
      next(err)
    }
  }
}
