import express from "express";
import { getAllLabs, getLabScheduleById } from "../labSchedule/controller";
import * as labScheduleService from "../labSchedule/service";

jest.mock("../labSchedule/service");

describe("Lab Schedule Controller", () => {
  const mockRequest = (params: any = {}) =>
    ({
      params,
    } as express.Request);

  const mockResponse = () => {
    const res: Partial<express.Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as express.Response;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllLabs", () => {
    it("should return 200 and all labs on success", async () => {
      const req = mockRequest();
      const res = mockResponse();

      const mockLabs = [
        {
          id: 1,
          start_time: "1970-01-01T12:00:00.000Z",
          end_time: "2024-01-01T11:00:00.000Z",
          date: "2024-03-10",
          user_id: 1,
          lab_id: 1,
        },
        {
          id: 2,
          start_time: "1970-01-01T12:00:00.000Z",
          end_time: "2024-01-01T11:00:00.000Z",
          date: "2024-03-10",
          user_id: 1,
          lab_id: 1,
        },
      ];

      (labScheduleService.getAll as jest.Mock).mockResolvedValue(mockLabs);

      await getAllLabs(req, res);

      expect(labScheduleService.getAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockLabs);
    });

    it("should return 400 and error message when there is an error", async () => {
      const req = mockRequest();
      const res = mockResponse();

      const error = new Error("Could not get labs.");
      (labScheduleService.getAll as jest.Mock).mockRejectedValue(error);

      await getAllLabs(req, res);

      expect(labScheduleService.getAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        message: "Could not get labs. ",
        error,
      });
    });
  });

  describe("getLabScheduleById", () => {
    it("should return 200 and lab schedule on success", async () => {
      const req = mockRequest({ id: "1" });
      const res = mockResponse();

      const mockLabSchedule = {
        id: 1,
        start_time: "1970-01-01T12:00:00.000Z",
        end_time: "2024-01-01T11:00:00.000Z",
        date: "2024-03-10",
        user_id: 1,
        lab_id: 1,
      };

      (labScheduleService.get as jest.Mock).mockResolvedValue(mockLabSchedule);

      await getLabScheduleById(req, res);

      expect(labScheduleService.get).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockLabSchedule);
    });

    it("should return 404 and error message when lab schedule is not found", async () => {
      const req = mockRequest({ id: "1" });
      const res = mockResponse();

      const error = new Error("Lab Schedule not found");
      (labScheduleService.get as jest.Mock).mockRejectedValue(error);

      await getLabScheduleById(req, res);

      expect(labScheduleService.get).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Lab Schedule not found",
      });
    });
  });
});
