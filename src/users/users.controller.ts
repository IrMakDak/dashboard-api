import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { IUserController } from "./users.controller.interface.js";
import { TYPES } from "../types.js";
import { ILogger } from "../logger/logger.interface.js";
import { HttpError } from "../errors/http-error.class.js";
import { BaseController } from "../common/base.controller.js";
import { UserLoginDto } from "./dto/user-login.dto.js";
import { UserRegisterDto } from "./dto/user-register.dto.js";
import { UserService } from "./users.service.js";
import { IUserService } from "./users.service.interface.js";
import { ValidateMiddleware } from "../common/validate.middleware.js";

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(
    @inject(TYPES.ILogger) loggerDervice: ILogger,
    @inject(TYPES.UserService) private userService: IUserService
  ) {
    super(loggerDervice);

    this.bindRoutes([
      {
        path: "/register",
        method: "post",
        func: this.register,
        middlewares: [new ValidateMiddleware(UserRegisterDto)],
      },
      {
        path: "/login",
        method: "post",
        func: this.login,
        middlewares: [new ValidateMiddleware(UserLoginDto)],
      },
    ]);
  }

  async register(
    { body }: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction
  ) {
    const result = await this.userService.createUser({
      email: body.email,
      password: body.password,
      name: body.name,
    });
    if (!result) {
      return next(new HttpError(422, "User is already exist"));
    }
    this.ok(res, { email: result.email, id: result.id });
  }

  async login(
    { body }: Request<{}, {}, UserLoginDto>,
    res: Response,
    next: NextFunction
  ) {
    const result = await this.userService.validateUser({
      email: body.email,
      password: body.password,
    });
    if (result === null) return next(new HttpError(401, "Such user not found"));

    if (result === false)
      return next(new HttpError(401, "Wrong email or password"));

    this.ok(res, `Logged in`);
  }
}
