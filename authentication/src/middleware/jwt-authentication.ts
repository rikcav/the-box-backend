import { Request, Response, NextFunction } from "express";
import { JwtService } from "../service/jwt-service";

export function jwtAuthentication(request: Request, response: Response, next: NextFunction) {
    const jwtService = new JwtService(); 
    const autorToken = request.headers.authorization;

    if (!autorToken) {
        return response.status(401).json({
            message: "Missing token!"
        });
    }

    const [, token] = autorToken.split(" ");

    try {
        request.body.userId = jwtService.extractSubject(token);
        return next();
    } catch (err) {
        return response.status(403).json({
            message: "Invalid token!"
        });
    }
}