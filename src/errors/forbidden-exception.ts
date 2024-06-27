import { HttpException } from "./http-exception";

export class ForbiddenException extends HttpException {
    constructor() {
        super(403, "Not authorized!");
    }
}