import express from "express";
import { get, update, deleteById } from "../user/controller";
import * as service from "../user/service";

jest.mock("../user/service");

describe("User Controller", () => {
  const mockRequest = (params: any, body: any = {}) =>
    ({
      params,
      body,
    } as express.Request);

  const mockResponse = () => {
    const res: Partial<express.Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    res.sendStatus = jest.fn().mockReturnValue(res);
    return res as express.Response;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("get", () => {
    it("should return 200 and user data on success", async () => {
      const req = mockRequest({ id: "1" });
      const res = mockResponse();

      const mockUser = {
        id: 1,
        name: "Fulano",
        email: "email@email.com",
        phone: "11111111111",
        profile: "USER",
        password: "?Aurelio123",
      };
      (service.getUserById as jest.Mock).mockResolvedValue(mockUser);

      await get(req, res);

      expect(service.getUserById).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockUser);
    });

    it("should return 400 and error message on failure", async () => {
      const req = mockRequest({ id: "1" });
      const res = mockResponse();

      const error = new Error("Could not get user");
      (service.getUserById as jest.Mock).mockRejectedValue(error);

      await get(req, res);

      expect(service.getUserById).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        message: "Could not get user",
        error,
      });
    });
  });

  describe("update", () => {
    it("should return 204 on successful update", async () => {
      const req = mockRequest(
        { id: "1" },
        {
          name: "Fulano",
          email: "email@email.com",
          phone: "11111111111",
          profile: "USER",
          password: "?Aurelio123",
        }
      );
      const res = mockResponse();

      const mockUser = {
        id: 1,
        name: "Fulano",
        email: "email@email.com",
        phone: "11111111111",
        profile: "USER",
        password: "?Aurelio123",
      };
      (service.updateUser as jest.Mock).mockResolvedValue(mockUser);

      await update(req, res);

      expect(service.updateUser).toHaveBeenCalledWith(1, {
        name: "Fulano",
        email: "email@email.com",
        phone: "11111111111",
        profile: "USER",
        password: "?Aurelio123",
      });
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalledWith();
    });

    it("should return 400 and error message on failure", async () => {
      const req = mockRequest(
        { id: "1" },
        {
          name: "Fulano",
          email: "email@email.com",
          phone: "11111111111",
          profile: "USER",
          password: "?Aurelio123",
        }
      );
      const res = mockResponse();

      const error = new Error("Could not update user");
      (service.updateUser as jest.Mock).mockRejectedValue(error);

      await update(req, res);

      expect(service.updateUser).toHaveBeenCalledWith(1, {
        name: "Fulano",
        email: "email@email.com",
        phone: "11111111111",
        profile: "USER",
        password: "?Aurelio123",
      });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        message: "Could not update user",
        error,
      });
    });
  });

  describe("deleteById", () => {
    it("should return 200 on successful deletion", async () => {
      const req = mockRequest({ id: "1" });
      const res = mockResponse();

      const mockUser = {
        id: 1,
        name: "Fulano",
        email: "email@email.com",
        phone: "11111111111",
        profile: "USER",
        password: "?Aurelio123",
      };
      (service.deleteUserById as jest.Mock).mockResolvedValue(mockUser);

      await deleteById(req, res);

      expect(service.deleteUserById).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith();
    });

    it("should return 400 and error message on failure", async () => {
      const req = mockRequest({ id: "1" });
      const res = mockResponse();

      const error = new Error("Could not delete user");
      (service.deleteUserById as jest.Mock).mockRejectedValue(error);

      await deleteById(req, res);

      expect(service.deleteUserById).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        message: "Could not delete user",
        error,
      });
    });
  });
});
