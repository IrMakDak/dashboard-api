import { Express } from "express";
const { default: express } = await import("express");
import { Server } from "http";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { UserController } from "./users/users.controller.js";
import { ILogger } from "./logger/logger.interface.js";
import { TYPES } from "./types.js";
import { IExeptionFilter } from "./errors/exeption.filter.interface.js";
import { IConfigService } from "./config/config.service.interface.js";
import { PrismaService } from "./database/prisma.service.js";
import { UsersRepository } from "./users/users.repository.js";

const { default: bodyParser } = await import("body-parser");

@injectable()
export class App {
  app: Express;
  port: number;
  server: Server;
  private logger: ILogger;
  private userController: UserController;
  private exeptionFilter: IExeptionFilter;
  private configService: IConfigService;
  private prismaService: PrismaService;
  private usersRepository: UsersRepository;

  constructor(
    @inject(TYPES.ILogger) logger: ILogger,
    @inject(TYPES.UserController) userController: UserController,
    @inject(TYPES.ExeptionFilter) exeptionFilter: IExeptionFilter,
    @inject(TYPES.ConfigService) configService: IConfigService,
    @inject(TYPES.PrismaService) prismaServise: PrismaService,
    @inject(TYPES.UsersRepository) usersRepository: UsersRepository
  ) {
    this.userController = userController;
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.server = new Server();
    this.exeptionFilter = exeptionFilter;
    this.configService = configService;
    this.prismaService = prismaServise;
    this.usersRepository = usersRepository;
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
    await this.prismaService.connect();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server started at http://localhost:${this.port}`);
  }
}
