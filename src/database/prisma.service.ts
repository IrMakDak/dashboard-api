import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import { TYPES } from "../types.js";
import { ILogger } from "../logger/logger.interface.js";

@injectable()
export class PrismaService {
  client: PrismaClient;

  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    this.client = new PrismaClient();
  }

  async connect() {
    try {
      await this.client.$connect();
      this.logger.log("[PrismaService] C onnected to db");
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          "[PrismaService] Error connecting to database:" + error.message
        );
      }
    }
  }

  async disconnect() {
    await this.client.$disconnect();
  }
}
