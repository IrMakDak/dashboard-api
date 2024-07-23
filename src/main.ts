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

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService);
  bind<IUserService>(TYPES.UserService).to(UserService);
  bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
  bind<IUserController>(TYPES.UserController).to(UserController);
  bind<App>(TYPES.Application).to(App);
});

function bootstrap() {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();

  return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
