import { authenticateController } from "../auth/controller";
import { authenticateService } from "../auth/service";
import { ZodError } from "zod";
import { HttpException } from "../errors/http-exception";
import { Request, Response } from "express";

jest.mock("../auth/service");

describe("authenticateController", () => {
  const mockRequest = (body: any) =>
    ({
      body,
    } as Request);

  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  it("should return a token when authentication is successful", async () => {
    const req = mockRequest({
      email: "email@email.com",
      password: "?Password03",
    });
    const res = mockResponse();

    const mockToken = "mockToken";

    (authenticateService as jest.Mock).mockResolvedValue(mockToken);

    await authenticateController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ token: mockToken });
  });

  it("should return a validation error when request body is invalid", async () => {
    const req = mockRequest({
      email: "emailinvalido@email.com",
      password: "dsada",
    });
    const res = mockResponse();

    const validationError = new ZodError([]);

    (authenticateService as jest.Mock).mockRejectedValue(validationError);

    await authenticateController(req, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.send).toHaveBeenCalledWith({
      message: "Validation error.",
      issues: validationError.format(),
    });
  });

  it("should return an appropriate error when authentication service throws HttpException", async () => {
    const req = mockRequest({
      email: "email@email.com",
      password: "?Password03",
    });
    const res = mockResponse();

    const httpException = new HttpException(401, "Unauthorized");

    (authenticateService as jest.Mock).mockRejectedValue(httpException);

    await authenticateController(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({ message: "Unauthorized" });
  });

  it("should return a 500 status and error message for internal server error", async () => {
    const req = mockRequest({
      email: "email@email.com",
      password: "?Password03",
    });
    const res = mockResponse();

    const error = new Error("Internal server error");

    (authenticateService as jest.Mock).mockRejectedValue(error);

    await authenticateController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      message: "Internal server error.",
    });
  });
});
