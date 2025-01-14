import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { User } from '../infra/typeorm/entities/User'
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider'
import { IUsersRepository } from '../repositories/IUsersRepository'

interface IRequest {
  name: string
  email: string
  password: string
}

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  async execute({ name, email, password }: IRequest): Promise<User> {
    const userEmail = await this.usersRepository.findByEmail(email)

    if (userEmail) {
      throw new AppError('User already exists!', 400)
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    return user
  }
}
