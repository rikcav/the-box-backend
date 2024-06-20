import { HttpException } from "./http-exception";

export class BadCredentialsException extends HttpException {
  constructor() {
    super(401, "Bad credentials!");
  }
}
