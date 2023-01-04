import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO'
import { User } from '../infra/typeorm/entities/User'

export interface IUsersRepository {
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>
  create(userData: ICreateUserDTO): Promise<User>
  findById(id: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  list(): Promise<User[]>
  save(user: User): Promise<User>
}
