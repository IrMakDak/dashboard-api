import "reflect-metadata";

import { Container, ContainerModule, interfaces } from "inversify";

import { ILogger } from "./logger/logger.interface.js";
import { LoggerService } from "./logger/logger.service.js";
import { ExeptionFilter } from "./errors/exeption.filter.js";
import { TYPES } from "./types.js";
import { UserController } from "./users/users.controller.js";
import { App } from "./app.js";
import { IExeptionFilter } from "./errors/exeption.filter.interface.js";
import { UserService } from "./users/users.service.js";
import { IUserService } from "./users/users.service.interface.js";
import { IUserController } from "./users/users.controller.interface.js";
import { IConfigService } from "./config/config.service.interface.js";
import { ConfigService } from "./config/config.service.js";
import { PrismaService } from "./database/prisma.service.js";
import { UsersRepository } from "./users/users.repository.js";

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
  bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope();
  bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
  bind<UsersRepository>(TYPES.UsersRepository)
    .to(UsersRepository)
    .inSingletonScope();
  bind<IConfigService>(TYPES.ConfigService)
    .to(ConfigService)
    .inSingletonScope();
  bind<IExeptionFilter>(TYPES.ExeptionFilter)
    .to(ExeptionFilter)
    .inSingletonScope();
  bind<IUserController>(TYPES.UserController)
    .to(UserController)
    .inSingletonScope();
  bind<App>(TYPES.Application).to(App).inSingletonScope();
});

function bootstrap() {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();

  return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
