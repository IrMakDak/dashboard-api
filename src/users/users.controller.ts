import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller";
import { HttpError } from "../errors/http-error.class";
import { ILogger } from "../logger/logger.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import "reflect-metadata";
import { IUserController } from "./users.controller.interface";

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
    next(new HttpError(401, "unauthorized"));
  }

  login(req: Request, res: Response, next: NextFunction) {
    this.ok(res, "login");
  }
}
