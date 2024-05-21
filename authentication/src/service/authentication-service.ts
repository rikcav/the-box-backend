import { UnauthorizedException } from "../errors/unauthorized-exception";
import { AuthenticationDto } from "../model/dtos/authentication-dto";
import { IUsersRepository } from "../repository/i-user-repository";
import { JwtService } from "./jwt-service";
import { compare } from "bcrypt";

export class AuthenticationService {
  constructor(
    private userRepository: IUsersRepository,
    private jwtService: JwtService
  ) {}

  public async authenticate(authenticationDto: AuthenticationDto) {
    const user = await this.userRepository.findByEmail(authenticationDto.email);

    if (!!user && await compare(authenticationDto.password, user.password)) {
        const token = this.jwtService.generateToken(user.id);
        return token
    }

    throw new UnauthorizedException("Bad credentials!")
  }
}
