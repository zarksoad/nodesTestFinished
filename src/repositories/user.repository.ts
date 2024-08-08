import { injectable } from "tsyringe";
import Iuser from "../interfaces/Iuser";
import User from "../models/user.model";
import { Cart } from "../models/cart.model";

@injectable()
export class UserReppository {
  async getAll(): Promise<User[]> {
    return User.findAll();
  }

  async getUserById(id: number): Promise<User | null> {
    return User.findByPk(id);
  }

  async createUser({ email, password, roleId }: Iuser): Promise<User> {
    const user = await User.create({ email, password, roleId });
    const userTocart = await User.findByPk(user.id);
    if (userTocart !== null) {
      const userId = userTocart.id;
      await Cart.create({ userId });
    }

    return user;
  }
  async deleteUser(id: number): Promise<void> {
    await User.destroy({ where: { id } });
   
  }

  async updateUser(id: number, user: Iuser): Promise<void> {
    await User.update(user, { where: { id } });
  }
  async getUserByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email } });
  }
}
