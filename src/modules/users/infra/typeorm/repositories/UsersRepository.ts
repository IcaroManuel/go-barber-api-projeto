import { getRepository, Not, Repository } from 'typeorm'

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { User } from '../entities/User'
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO'

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }
  async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let users: User[]

    if (except_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(except_user_id),
        },
      })
    } else {
      users = await this.ormRepository.find()
    }
    return users
  }

  async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData)
    await this.ormRepository.save(user)

    return user
  }

  async findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne(id)
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: { email },
    })
  }

  async list(): Promise<User[]> {
    return this.ormRepository.find()
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user)
  }
}

export default UsersRepository
