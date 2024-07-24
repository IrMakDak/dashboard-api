import "reflect-metadata";
import { inject, injectable } from "inversify";
import { UserLoginDto } from "./dto/user-login.dto.js";
import { UserRegisterDto } from "./dto/user-register.dto.js";
import { User } from "./user.entity.js";
import { IUserService } from "./users.service.interface.js";
import { TYPES } from "../types.js";
import { IConfigService } from "../config/config.service.interface.js";
import { IUsersRepository } from "./users.repository.interface.js";
import bcryptjs from "bcryptjs";
const { compare } = bcryptjs;

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.UsersRepository) private usersRepository: IUsersRepository
  ) {}
  async createUser({ email, password, name }: UserRegisterDto) {
    const newUser = new User(email, name);
    const salt = this.configService.get("SALT");
    await newUser.setPassword(password, Number(salt));

    const existedUser = await this.usersRepository.find(email);

    if (existedUser) {
      return null;
    } else {
      return await this.usersRepository.create(newUser);
    }
  }

  async validateUser({ email, password }: UserLoginDto) {
    const existedUser = await this.usersRepository.find(email);
    const existedPassword = existedUser?.password;
    if (!existedPassword) return null;

    const isPasswordValid = await compare(password, existedPassword);

    if (isPasswordValid) {
      return true;
    } else {
      return false;
    }
  }
}
