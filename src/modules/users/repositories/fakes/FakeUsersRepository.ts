import { randomUUID } from 'crypto'

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { IUsersRepository } from '../IUsersRepository'
import { User } from '@modules/users/infra/typeorm/entities/User'
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO'

export class FakeUsersRepository implements IUsersRepository {
  private users: User[] = []

  async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, { id: randomUUID() }, userData)
    this.users.push(user)

    return user
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const userEmail = this.users.find(user => user.email === email)

    return userEmail
  }

  async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id)

    return findUser
  }

  async list(): Promise<User[]> {
    return this.users
  }

  async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id)

    this.users[findIndex] = user

    return user
  }

  async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let { users } = this

    if (except_user_id) {
      users = this.users.filter(user => user.id !== except_user_id)
    }

    return users
  }
}
