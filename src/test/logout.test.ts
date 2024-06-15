import express from "express";
import { logout } from "../auth/controller";
import { logoutUser } from "../auth/service";

jest.mock("../auth/service");

describe("logout", () => {
  const mockRequest = (headers: any, body: any) =>
    ({
      headers,
      body,
    } as express.Request);

  const mockResponse = () => {
    const res: Partial<express.Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res as express.Response;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 and success message on successful logout", async () => {
    const req = mockRequest(
      { authorization: "Bearer validtoken" },
      { userId: 1 }
    );
    const res = mockResponse();

    (logoutUser as jest.Mock).mockResolvedValue(undefined);

    await logout(req, res);

    expect(logoutUser).toHaveBeenCalledWith(1, "validtoken");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith("Logged out successfully");
  });

  it("should return 500 and error message if logout fails", async () => {
    const req = mockRequest(
      { authorization: "Bearer validtoken" },
      { userId: 1 }
    );
    const res = mockResponse();

    const errorMessage = "Logout failed";
    (logoutUser as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await logout(req, res);

    expect(logoutUser).toHaveBeenCalledWith(1, "validtoken");
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(errorMessage);
  });
});
