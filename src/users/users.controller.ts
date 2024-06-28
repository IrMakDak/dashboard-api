import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller";
import { HttpError } from "../errors/http-error.class";
import { ILogger } from "../logger/logger.interface";

export class UserController extends BaseController {
  constructor(logger: ILogger) {
    super(logger);

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
