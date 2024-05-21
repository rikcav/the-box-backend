import { Router } from "express";
import * as userController  from "./controller/user-controller";
import { jwtAuthentication } from "./middleware/jwt-authentication";
import * as authenticationController from "./controller/authentication-controller";

const router = Router();

router.get("/users", jwtAuthentication, userController.myProfile);
router.post("/users", userController.createUser);

router.post("/auth", authenticationController.authenticate);

export { router };