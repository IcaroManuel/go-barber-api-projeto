import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

export interface IUsersRepository {
  createUser(userData: ICreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User | undefined>
  list(): Promise<User[]>
}