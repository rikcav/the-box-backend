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

interface RegisterResponseDto {
  name: string;
  email: string;
  phone: string;
  profile: "USER" | "SUPER_USER";
}

export const registerUser = async (registerDto: RegisterDto) => {
  try {
    registerDto.phone = registerDto.phone
      .replace("(", "")
      .replace(")", "")
      .replace("-", "")
      .replace(" ", "");

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

    const registeredUser: RegisterResponseDto = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      profile: user.profile,
    };

    console.log("Registered user: ", registeredUser);

    return registeredUser;
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

function generateToken(sub: number) {
  return sign({ sub }, env.SECRET_KEY, {
    algorithm: "HS512",
    expiresIn: "2 days",
  });
}

export const logoutUser = async (userId: number, token: string) => {
  try {
    const hashedToken = await hash(token, 10);
    await prisma.user.update({
      where: { id: userId },
      data: {
        blacklistTokens: {
          push: hashedToken,
        },
      },
    });
    console.log("Token added to user blacklist: ", hashedToken);
  } catch (e) {
    console.log("Could not add token to user blacklist", e);
    throw e;
  }
};
