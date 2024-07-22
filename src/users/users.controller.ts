import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { IUserController } from "./users.controller.interface.js";
import { TYPES } from "../types.js";
import { ILogger } from "../logger/logger.interface.js";
import { HttpError } from "../errors/http-error.class.js";
import { BaseController } from "../common/base.controller.js";

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(@inject(TYPES.ILogger) private loggerDervice: ILogger) {
    super(loggerDervice);

    this.bindRoutes([
      { path: "/register", method: "post", func: this.register },
      { path: "/login", method: "post", func: this.login },
    ]);
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, "register");
  }

  login(req: Request, res: Response, next: NextFunction) {
    next(new HttpError(401, "unauthorized"));
  }
}
