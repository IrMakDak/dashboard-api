import { inject, injectable } from "inversify";
import { IConfigService } from "./config.service.interface.js";
import { config, DotenvConfigOutput, DotenvParseOutput } from "dotenv";
import { TYPES } from "../types.js";
import "reflect-metadata";
import { ILogger } from "../logger/logger.interface.js";

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;

  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    this.config = {};
    const result: DotenvConfigOutput = config();
    if (result.error) {
      this.logger.error("The .env file could not be read or it is missing");
    } else {
      this.logger.log("[ConfigService] .env config is loaded");
      this.config = result.parsed as DotenvParseOutput;
    }
  }

  get(key: string) {
    return this.config[key] as string;
  }
}
