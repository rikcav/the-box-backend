import { $Enums, Prisma } from "@prisma/client";
import { IUsersRepository } from "../i-user-repository";
import { prisma } from "./prisma";

export class UserRepository implements IUsersRepository {
  public async findById(userId: string) {
    return await prisma.user.findUnique({ where: { id: userId } });
  }

  public async create(user: Prisma.UserCreateInput) {
    await prisma.user.create({ data: user });
  }

  public async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email: email } });
  }
}
