import express from "express";
import { createLabSchedule } from "../labSchedule/controller";
import * as LabScheduleService from "../labSchedule/service";
import dayjs from "dayjs";

jest.mock("../labSchedule/service");

describe("create lab schedule", () => {
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

  it("should return 201 and created lab schedule on success", async () => {
    const req = mockRequest({
      startTime: "2024-07-11T11:00:32.597Z",
      endTime: "2024-07-11T12:00:32.597Z",
      date: "2024-03-12T03:00:00.000Z",
      userId: 1,
      labId: 1,
    });
    const res = mockResponse();

    const mockLabSchedule = {
      id: 1,
      startTime: dayjs("2024-07-11T11:00:32.597Z"),
      endTime: dayjs("2024-07-11T12:00:32.597Z"),
      date: dayjs("2024-03-12T03:00:00.000Z"),
      userId: 1,
      labId: 1,
    };
    (LabScheduleService.createLabSchedule as jest.Mock).mockResolvedValue(
      mockLabSchedule
    );

    await createLabSchedule(req, res);

    expect(LabScheduleService.createLabSchedule).toHaveBeenCalledWith({
      startTime: dayjs("2024-07-11T11:00:32.597Z"),
      endTime: dayjs("2024-07-11T12:00:32.597Z"),
      date: dayjs("2024-03-12T03:00:00.000Z"),
      userId: 1,
      labId: 1,
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(mockLabSchedule);
  });

  it("should return 500 and internal server error on unexpected error", async () => {
    const req = mockRequest({
      startTime: "2024-07-11T11:00:32.597Z",
      endTime: "2024-07-11T12:00:32.597Z",
      date: "2024-03-12T03:00:00.000Z",
      userId: 1,
      labId: 1,
    });
    const res = mockResponse();

    const error = new Error("Unexpected error");
    (LabScheduleService.createLabSchedule as jest.Mock).mockRejectedValue(
      error
    );

    await createLabSchedule(req, res);

    expect(LabScheduleService.createLabSchedule).toHaveBeenCalledWith({
      startTime: dayjs("2024-07-11T11:00:32.597Z"),
      endTime: dayjs("2024-07-11T12:00:32.597Z"),
      date: dayjs("2024-03-12T03:00:00.000Z"),
      userId: 1,
      labId: 1,
    });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      message: "Internal server error.",
    });
  });
});
