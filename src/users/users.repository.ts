import { User } from "./user.entity.js";
import { IUsersRepository } from "./users.repository.interface.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../types.js";
import { PrismaService } from "../database/prisma.service.js";

@injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @inject(TYPES.PrismaService) private prismaService: PrismaService
  ) {}
  async create({ email, password, name }: User) {
    return this.prismaService.client.userModel.create({
      data: { email, password, name },
    });
  }
  async find(email: string) {
    return this.prismaService.client.userModel.findFirst({
      where: {
        email,
      },
    });
  }
}
