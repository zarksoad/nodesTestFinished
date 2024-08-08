import { UserReppository } from "./../repositories/user.repository";
import { inject, injectable } from "tsyringe";
import User from "../models/user.model";
import Iuser from "../interfaces/Iuser";
import bcrypt from "bcrypt";

@injectable()
export class UserService {
  constructor(
    @inject(UserReppository) private userReppository: UserReppository
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userReppository.getAll();
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.userReppository.getUserById(id);
  }
  async createUser({ email, password, roleId }: Iuser): Promise<User> {
    password = await bcrypt.hash(password, 10);
    return await this.userReppository.createUser({ email, password, roleId });
  }

  async deleteUser(id: number): Promise<void> {
    return await this.userReppository.deleteUser(id);
  }

  async updateUser(id: number, user: Iuser): Promise<void> {
    return await this.userReppository.updateUser(id, user);
  }
}
