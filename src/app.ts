import { Express } from "express";
const { default: express } = await import("express");
import { Server } from "http";
import { UserController } from "./users/users.controller";
import { ExeptionFilter } from "./errors/exeption.filter";
import { ILogger } from "./logger/logger.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "./types";
import "reflect-metadata";

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

  useRoutes() {
    this.app.use("/users", this.userController.router);
  }

  useExeptionFilters() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  public async init() {
    this.useRoutes();
    this.useExeptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server started at http://localhost:${this.port}`);
  }
}
