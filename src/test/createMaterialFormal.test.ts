import express from "express";
import { createMaterialFormal } from "../material/controller";
import * as service from "../material/service";

jest.mock("../material/service");

describe("createMaterialFormal", () => {
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

  it("should return 200 and created material on success", async () => {
    const req = mockRequest({
      title: "Material Formal",
      url: "https://example.com/material",
      description: "Descrição do material",
      userId: 1,
      category: "BAREMA",
    });
    const res = mockResponse();

    const mockMaterial = {
      id: 1,
      title: "Material Formal",
      url: "https://example.com/material",
      description: "Descrição do material",
      userId: 1,
      category: "BAREMA",
      type: "FORMAL",
    };
    (service.createMaterial as jest.Mock).mockResolvedValue(mockMaterial);

    await createMaterialFormal(req, res);

    expect(service.createMaterial).toHaveBeenCalledWith({
      title: "Material Formal",
      url: "https://example.com/material",
      description: "Descrição do material",
      userId: 1,
      category: "BAREMA",
      type: "FORMAL",
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ material: mockMaterial });
  });

  it("should return 422 and validation error on invalid input", async () => {
    const req = mockRequest({
      title: "",
      url: "invalid-url",
      description: "",
      userId: "invalid",
      category: "INVALID_CATEGORY",
    });
    const res = mockResponse();

    await createMaterialFormal(req, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Validation error.",
      })
    );
  });

  it("should return 500 and internal server error on unexpected error", async () => {
    const req = mockRequest({
      title: "Material Formal",
      url: "https://example.com/material",
      description: "Descrição do material",
      userId: 1,
      category: "BAREMA",
    });
    const res = mockResponse();

    const error = new Error("Unexpected error");
    (service.createMaterial as jest.Mock).mockRejectedValue(error);

    await createMaterialFormal(req, res);

    expect(service.createMaterial).toHaveBeenCalledWith({
      title: "Material Formal",
      url: "https://example.com/material",
      description: "Descrição do material",
      userId: 1,
      category: "BAREMA",
      type: "FORMAL",
    });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      message: "Internal server error.",
    });
  });
});
