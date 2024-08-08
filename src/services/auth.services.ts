import { inject, injectable } from "tsyringe";
import { UserReppository } from "../repositories/user.repository";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import JWT_SECRET from "../config/jwt";
import bcrypt from "bcrypt";
dotenv.config();

@injectable()
export class AuthServices {
  constructor(
    @inject(UserReppository) private userRepository: UserReppository
  ) {}

  async login(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.getUserByEmail(email);
    if (user === null) {
      return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("User or login don't match");
      return null;
    }
    const token = jwt.sign(
      { userId: user.id, roleId: user.roleId },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    return token;
  }
}
