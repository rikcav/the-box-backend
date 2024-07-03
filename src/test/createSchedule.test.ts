import express from "express";
import { create } from "../schedule/controller";
import * as service from "../schedule/service";
import { ZodError } from "zod";

jest.mock("../schedule/service");

describe("create", () => {
  const mockRequest = (body: any = {}) =>
    ({
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

  it("should return 201 and created schedule on success", async () => {
    const req = mockRequest({ year: "2022", period: "2022.1" });
    const res = mockResponse();

    const mockSchedule = { id: 1, year: "2022", period: "2022.1" };
    (service.create as jest.Mock).mockResolvedValue(mockSchedule);

    await create(req, res);

    expect(service.create).toHaveBeenCalledWith({
      year: "2022",
      period: "2022.1",
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(mockSchedule);
  });

  it("should return 400 and validation error on invalid input", async () => {
    const req = mockRequest({ year: "2022" });
    const res = mockResponse();

    const error = new ZodError([]);
    (service.create as jest.Mock).mockRejectedValue(error);

    await create(req, res);

    expect(service.create).toHaveBeenCalledWith({ year: "2022" });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      message: "Validation error",
      error,
    });
  });

  it("should return 400 and error message on other errors", async () => {
    const req = mockRequest({ year: "2022", period: "2022.1" });
    const res = mockResponse();

    const error = new Error("Unexpected error");
    (service.create as jest.Mock).mockRejectedValue(error);

    await create(req, res);

    expect(service.create).toHaveBeenCalledWith({
      year: "2022",
      period: "2022.1",
    });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(error);
  });
});
