import express from "express";
import { create } from "../event/controller";
import * as service from "../event/service";
import { ZodError } from "zod";

jest.mock("../event/service");

describe("create new event", () => {
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

  it("should return 201 and created event on success", async () => {
    const req = mockRequest({
      name: "Evento 1",
      description: "Descrição evento 1",
      start_date: "2024-03-10",
      end_date: "2024-03-11",
      start_time: "1970-01-01T12:00:00.000Z",
      end_time: "1970-01-01T15:00:00.000Z",
      speakers: "Lorem Ipsum",
    });
    const res = mockResponse();

    const mockEvent = {
      id: 1,
      name: "Evento 1",
      description: "Descrição evento 1",
      start_date: "2024-03-10",
      end_date: "2024-03-11",
      start_time: "1970-01-01T12:00:00.000Z",
      end_time: "1970-01-01T15:00:00.000Z",
      speakers: "Lorem Ipsum",
    };
    (service.create as jest.Mock).mockResolvedValue(mockEvent);

    await create(req, res);

    expect(service.create).toHaveBeenCalledWith({
      name: "Evento 1",
      description: "Descrição evento 1",
      start_date: "2024-03-10",
      end_date: "2024-03-11",
      start_time: "1970-01-01T12:00:00.000Z",
      end_time: "1970-01-01T15:00:00.000Z",
      speakers: "Lorem Ipsum",
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(mockEvent);
  });

  it("should return 400 and validation error on invalid input", async () => {
    const req = mockRequest({
      name: "",
      description: "Descrição evento 1",
      start_date: "a",
      end_date: "2024-03-11",
      start_time: "a",
      end_time: "1970-01-01T15:00:00.000Z",
      speakers: "Lorem Ipsum",
    });
    const res = mockResponse();

    const validationError = new ZodError([]);
    (service.create as jest.Mock).mockRejectedValue(validationError);

    await create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      message: "Validation error",
      error: validationError,
    });
  });
});
