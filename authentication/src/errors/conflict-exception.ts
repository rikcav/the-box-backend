import { HttpException } from "./http-exception"

export class ConflictException extends HttpException {
    constructor(message: string) {
        super(409, message)
    }
}