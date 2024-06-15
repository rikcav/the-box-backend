import express from "express";
import { updateById } from "../comment/controller";
import * as commentService from "../comment/service";
import { ZodError } from "zod";

jest.mock("../comment/service");

describe("updateById", () => {
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

  it("should return 200 and success message on successful update", async () => {
    const req = mockRequest({ id: "1" }, { body: "Updated Lorem Ipsum" });
    const res = mockResponse();

    const mockComment = { id: 1, body: "Updated Lorem Ipsum" };
    (commentService.updateById as jest.Mock).mockResolvedValue(mockComment);

    await updateById(req, res);

    expect(commentService.updateById).toHaveBeenCalledWith({
      id: 1,
      body: "Updated Lorem Ipsum",
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      message: "Updated comment!",
      comment: mockComment,
    });
  });

  it("should return 400 and validation error message on validation error", async () => {
    const req = mockRequest({ id: "1" }, { body: "" });
    const res = mockResponse();

    const validationError = new ZodError([]);
    (commentService.updateById as jest.Mock).mockRejectedValue(validationError);

    await updateById(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      mensage: "Validation failed.",
      errors: validationError,
    });
  });

  it("should return 400 and error message on other errors", async () => {
    const req = mockRequest({ id: "1" }, { body: "Updated Lorem Ipsum" });
    const res = mockResponse();

    const error = new Error("Could not update a comment.");
    (commentService.updateById as jest.Mock).mockRejectedValue(error);

    await updateById(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      mensage: "Could not update a comment.",
      errors: error,
    });
  });
});
