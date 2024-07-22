import { NextFunction, Request, Response } from "express";

import { inject, injectable } from "inversify";
import "reflect-metadata";
import { HttpError } from "./http-error.class.js";
import { TYPES } from "../types.js";
import { ILogger } from "../logger/logger.interface.js";
import { IExeptionFilter } from "./exeption.filter.interface.js";

@injectable()
export class ExeptionFilter implements IExeptionFilter {
  private logger: ILogger;

  constructor(@inject(TYPES.ILogger) logger: ILogger) {
    this.logger = logger;
  }

  catch(
    error: Error | HttpError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (error instanceof HttpError) {
      this.logger.error(
        `[${error.context}] - Ошибка ${error.statusCode} : ${error.message}`
      );
      res.status(error.statusCode).send({ error: error.message });
    } else {
      `${error.message}`;
      res.status(500).send({ error: error.message });
    }
  }
}
