import { Prisma, User } from "@prisma/client"

export interface IUsersRepository {
    findById: (userId: string) => Promise<User | null>
    findByEmail: (email: string) => Promise<User | null>
    create: (user: Prisma.UserCreateInput) => Promise<void>
    // update: (userId: number, data: Prisma.UserUncheckedUpdateInput) => Promise<User>
}