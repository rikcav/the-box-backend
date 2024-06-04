import { sign } from "jsonwebtoken";
import { prisma } from "../prisma/service";
import { userValidation } from "../user/validation";
import { compare, hash } from "bcrypt";
import { env } from "../env";
import { BadCredentialsException } from "../errors/bad-credentials-exception";

interface RegisterDto {
  name: string;
  email: string;
  phone: string;
  profile: "USER" | "SUPER_USER";
  password: string;
}

export const registerUser = async (registerDto: RegisterDto) => {
  try {
    const parsedData = userValidation.parse(registerDto);
    const hashedPassword = await hash(parsedData.password, 10);
    const user = await prisma.user.create({
      data: {
        name: parsedData.name,
        email: parsedData.email,
        phone: parsedData.phone,
        profile: parsedData.profile,
        password: hashedPassword,
      },
    });

    console.log("Registered user: ", user);

    return user;
  } catch (e) {
    console.log("Could not register user", e);
    throw e;
  }
};

interface LoginDto {
  email: string;
  password: string;
}

export const authenticateService = async (loginDto: LoginDto) => {
  const user = await prisma.user.findUnique({
    where: {
      email: loginDto.email,
    },
  });

  if (!user || !(await compare(loginDto.password, user.password))) {
    throw new BadCredentialsException();
  }

  return generateToken(user.id);
};

function generateToken(sub: bigint) {
  return sign({ sub }, env.SECRET_KEY, {
    algorithm: "HS512",
    expiresIn: "2 days",
  });
}