import express from "express";
import { listEvents } from "../event/controller";
import * as service from "../event/service";
import dayjs from "dayjs";

jest.mock("../event/service");

describe("listEvents", () => {
  const mockRequest = (query: any = {}) =>
    ({
      query,
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

  it("should return 200 and list of events on success", async () => {
    const req = mockRequest({
      startDate: "2024-03-10T03:00:00.000Z",
      endDate: "2024-12-13T03:00:00.000Z",
    });
    const res = mockResponse();

    const mockEvents = [
      {
        id: 1,
        name: "evento1",
        start_date: "2024-10-01",
        end_date: "2024-10-01",
      },
      {
        id: 2,
        name: "evento2",
        start_date: "2024-10-15",
        end_date: "2024-12-12",
      },
    ];
    (service.listEvents as jest.Mock).mockResolvedValue(mockEvents);

    await listEvents(req, res);

    expect(service.listEvents).toHaveBeenCalledWith(
      dayjs("2024-03-10"),
      dayjs("2024-12-13")
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ events: mockEvents });
  });

  it("should return 422 and validation error on invalid input", async () => {
    const req = mockRequest({ startDate: "invalid-date" });
    const res = mockResponse();

    await listEvents(req, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Validation error.",
      })
    );
  });

  it("should return 500 and internal server error on unexpected error", async () => {
    const req = mockRequest({
      startDate: "2024-03-10T03:00:00.000Z",
      endDate: "2024-12-13T03:00:00.000Z",
    });
    const res = mockResponse();

    const error = new Error("Unexpected error");
    (service.listEvents as jest.Mock).mockRejectedValue(error);

    await listEvents(req, res);

    expect(service.listEvents).toHaveBeenCalledWith(
      dayjs("2024-03-10"),
      dayjs("2024-12-13")
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      message: "Internal server error.",
    });
  });
});
