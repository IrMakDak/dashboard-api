import "reflect-metadata";
import { inject, injectable } from "inversify";
import { UserLoginDto } from "./dto/user-login.dto.js";
import { UserRegisterDto } from "./dto/user-register.dto.js";
import { User } from "./user.entity.js";
import { IUserService } from "./users.service.interface.js";
import { TYPES } from "../types.js";
import { IConfigService } from "../config/config.service.interface.js";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService
  ) {}
  async createUser({ email, password, name }: UserRegisterDto) {
    const newUser = new User(email, name);
    const salt = this.configService.get("SALT");

    await newUser.setPassword(password, Number(salt));
    return newUser;
  }
  async validateUser({}: UserLoginDto) {
    return true;
  }
}
