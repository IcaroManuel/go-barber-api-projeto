import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import { IUsersRepository } from '../repositories/IUsersRepository'
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider'
import { User } from '../infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'

import authConfig from '../../../config/auth'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  token: string
  user: User
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const isPasswordMatched = await this.hashProvider.compareHash(
      password,
      user.password
    )

    if (!isPasswordMatched) {
      throw new AppError('Incorrect email/password combination!', 401)
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    })
    console.log(token, 'foi')
    return { user, token }
  }
}

export default AuthenticateUserService
