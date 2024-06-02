import { sign } from "jsonwebtoken";
import { prisma } from "../prisma/service";
import { compare } from "bcrypt";
import { env } from "../env";
import { BadCredentialsException } from "../errors/bad-credentials-exception";

export const registerUser = async () => {
  try {
    console.log("Register user");
  } catch (e) {
    console.log("Could not register user");
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
