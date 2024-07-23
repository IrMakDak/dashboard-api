import "reflect-metadata";
import { injectable } from "inversify";
import { UserLoginDto } from "./dto/user-login.dto.js";
import { UserRegisterDto } from "./dto/user-register.dto.js";
import { User } from "./user.entity.js";
import { IUserService } from "./users.service.interface.js";

@injectable()
export class UserService implements IUserService {
  constructor() {}
  async createUser({ email, password, name }: UserRegisterDto) {
    const newUser = new User(email, name);
    await newUser.setPassword(password);
    return newUser;
  }
  async validateUser({}: UserLoginDto) {
    return true;
  }
}
