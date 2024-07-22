import { Express } from "express";
const { default: express } = await import("express");
import { Server } from "http";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { UserController } from "./users/users.controller.js";
import { ILogger } from "./logger/logger.interface.js";
import { TYPES } from "./types.js";
import { ExeptionFilter } from "./errors/exeption.filter.js";

const { default: bodyParser } = await import("body-parser");

@injectable()
export class App {
  app: Express;
  port: number;
  server: Server;
  private logger: ILogger;
  private userController: UserController;
  private exeptionFilter: ExeptionFilter;

  constructor(
    @inject(TYPES.ILogger) logger: ILogger,
    @inject(TYPES.UserController) userController: UserController,
    @inject(TYPES.ExeptionFilter) exeptionFilter: ExeptionFilter
  ) {
    this.userController = userController;
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.server = new Server();
    this.exeptionFilter = exeptionFilter;
  }

  useMiddleware() {
    this.app.use(bodyParser.json());
  }

  useRoutes() {
    this.app.use("/users", this.userController.router);
  }

  useExeptionFilters() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  public async init() {
    this.useMiddleware();
    this.useRoutes();
    this.useExeptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server started at http://localhost:${this.port}`);
  }
}
