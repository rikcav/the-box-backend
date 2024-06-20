import express from "express";
import { likeCommentController } from "../comment/controller";
import * as commentService from "../comment/service";
import { ZodError } from "zod";

jest.mock("../comment/service");

describe("likeCommentController", () => {
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

  it("should return 200 and like object on successful like", async () => {
    const req = mockRequest({ id: "1" }, { userId: 1 });
    const res = mockResponse();

    const mockLike = { id: 1, commentId: 1, userId: 1 };
    (commentService.likeCommentService as jest.Mock).mockResolvedValue(
      mockLike
    );

    await likeCommentController(req, res);

    expect(commentService.likeCommentService).toHaveBeenCalledWith({
      commentId: 1,
      userId: 1,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ like: mockLike });
  });

  it("should return 422 and validation error message on validation error", async () => {
    const req = mockRequest({ id: "abc" }, { userId: "abc" });
    const res = mockResponse();

    const validationError = new ZodError([]);
    (commentService.likeCommentService as jest.Mock).mockRejectedValue(
      validationError
    );

    await likeCommentController(req, res);

    expect(res.status).toHaveBeenCalledWith(422);
  });

  it("should return error status and message on other errors", async () => {
    const req = mockRequest({ id: "1" }, { userId: 1 });
    const res = mockResponse();

    const error = new Error("Internal server error");
    (commentService.likeCommentService as jest.Mock).mockRejectedValue(error);

    await likeCommentController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      message: "Internal server error.",
    });
  });
});
