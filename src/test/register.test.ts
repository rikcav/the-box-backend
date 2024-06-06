import { register } from "../auth/controller";
import { registerUser } from "../auth/service";
import { ZodError } from "zod";
import { Request, Response } from "express";
import { mocked } from "jest-mock";

enum ProfileEnum {
  USER = "USER",
  SUPER_USER = "SUPER_USER",
}

jest.mock("../auth/service");

describe("register", () => {
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

  it("should return 200 and registered user on success", async () => {
    const req = mockRequest({
      name: "Aluno Teste",
      email: "email@email.com",
      phone: "(99)99999-9999",
      profile: "USER",
      password: "?Senha123",
    });
    const res = mockResponse();

    const mockUser = {
      id: 1,
      name: "Aluno Teste",
      email: "email@email.com",
      phone: "(99)99999-9999",
      profile: ProfileEnum.USER,
      password: "?Senha123",
    };

    mocked(registerUser).mockResolvedValue(mockUser);

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      message: "Registered",
      user: mockUser,
    });
  });

  it("should return 400 if validation fails", async () => {
    const req = mockRequest({
      name: "Aluno Teste",
      email: "email@email.com",
      phone: "(99)99999-9999",
      profile: "USER",
      password: "?Senha123",
    });
    const res = mockResponse();

    const validationError = new ZodError([]);

    mocked(registerUser).mockRejectedValue(validationError);

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      message: "Validation failed",
      errors: validationError,
    });
  });

  it("should return 400 on other errors", async () => {
    const req = mockRequest({
      name: "Aluno Teste",
      email: "email@email.com",
      phone: "(99)99999-9999",
      profile: "USER",
      password: "?Senha123",
    });
    const res = mockResponse();

    const error = new Error("Registration error");

    mocked(registerUser).mockRejectedValue(error);

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      message: "Could not register user",
      error,
    });
  });
});
