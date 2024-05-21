import { ConflictException } from "../errors/conflict-exception";
import { NotFoundException } from "../errors/not-found-exception";
import { UserDto } from "../model/dtos/user-dto";
import { IUsersRepository } from "../repository/i-user-repository";
import { hash } from "bcrypt";

export class UserService {
  constructor(private userRepository: IUsersRepository) {}

  public async createUser(userDto: UserDto) {
    const userExists = this.userRepository.findByEmail(userDto.email);
    if (!userExists) {
      throw new ConflictException("There is already a user with this email!")
    }

    userDto.password = await hash(userDto.password, 8);


    await this.userRepository.create(userDto);
  }

  public async findUserById(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException("User not found!");
    }

    return user;
  }
}
