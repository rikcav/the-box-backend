import express from "express";
import { getAll, get } from "../establishment/controller";
import * as service from "../establishment/service";

jest.mock("../establishment/service");

describe("establishment list", () => {
  const mockRequest = (params: any = {}, body: any = {}) =>
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

  describe("getAll", () => {
    it("should return 200 and list of establishments on success", async () => {
      const req = mockRequest();
      const res = mockResponse();

      const mockEstablishments = [
        { id: 1, name: "nome 1" },
        { id: 2, name: "nome 2" },
      ];
      (service.getAll as jest.Mock).mockResolvedValue(mockEstablishments);

      await getAll(req, res);

      expect(service.getAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockEstablishments);
    });

    it("should return 400 and error message on failure", async () => {
      const req = mockRequest();
      const res = mockResponse();

      const error = new Error("Unable to fetch establishments");
      (service.getAll as jest.Mock).mockRejectedValue(error);

      await getAll(req, res);

      expect(service.getAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        message: "Could not get establishments",
        error,
      });
    });
  });

  describe("get", () => {
    it("should return 200 and establishment on success", async () => {
      const req = mockRequest({ id: "1" });
      const res = mockResponse();

      const mockEstablishment = { id: 1, name: "nome 1" };
      (service.get as jest.Mock).mockResolvedValue(mockEstablishment);

      await get(req, res);

      expect(service.get).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockEstablishment);
    });

    it("should return 400 and error message on failure", async () => {
      const req = mockRequest({ id: "1" });
      const res = mockResponse();

      const error = new Error("Unable to fetch establishment");
      (service.get as jest.Mock).mockRejectedValue(error);

      await get(req, res);

      expect(service.get).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        message: "Could not get establishment",
        error,
      });
    });
  });
});
