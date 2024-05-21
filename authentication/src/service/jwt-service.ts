import { sign, verify } from "jsonwebtoken";
import { env } from "../env";

export class JwtService {
    public generateToken(sub: string) {
        const token = sign({sub}, env.SECRET_KEY, {algorithm: "HS512", expiresIn: "2 days"});
        return token;
    }

    public extractSubject(token: string) {
        return verify(token, env.SECRET_KEY).sub;
    }
}
