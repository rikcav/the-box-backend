import express from "express";
import { update } from "../labSchedule/controller";
import * as labScheduleService from "../labSchedule/service";
import { ZodError } from "zod";

jest.mock("../labSchedule/service");

describe("update", () => {
  const mockRequest = (params: any, body: any) =>
    ({
      params,
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

  it("should return 204 when lab schedule is successfully updated", async () => {
    const req = mockRequest(
      { id: "1" },
      {
        start_time: "1970-01-01T12:00:00.000Z",
        end_time: "2024-01-01T11:00:00.000Z",
        date: "2024-03-10",
        user_id: 1,
        lab_id: 1,
      }
    );
    const res = mockResponse();

    const mockLab = {
      id: 1,
      start_time: "1970-01-01T12:00:00.000Z",
      end_time: "2024-01-01T11:00:00.000Z",
      date: "2024-03-10",
      user_id: 1,
      lab_id: 1,
    };
    (labScheduleService.update as jest.Mock).mockResolvedValue(mockLab);

    await update(req, res);

    expect(labScheduleService.update).toHaveBeenCalledWith(1, req.body);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it("should return 400 and validation error when input is invalid", async () => {
    const req = mockRequest({ id: "1" }, { start_time: "invalid" });
    const res = mockResponse();

    const validationError = new ZodError([]);
    (labScheduleService.update as jest.Mock).mockRejectedValue(validationError);

    await update(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      message: "Validation error: ",
      error: validationError.errors,
    });
  });

  it("should return 400 and general error message when an unexpected error occurs", async () => {
    const req = mockRequest(
      { id: "1" },
      {
        start_time: "1970-01-01T12:00:00.000Z",
        end_time: "2024-01-01T11:00:00.000Z",
        date: "2024-03-10",
        user_id: 1,
        lab_id: 1,
      }
    );
    const res = mockResponse();

    const error = new Error("Unexpected error");
    (labScheduleService.update as jest.Mock).mockRejectedValue(error);

    await update(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      message: "Could not update lab: ",
      error,
    });
  });
});
