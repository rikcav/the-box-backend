import express from "express";
import { listComments } from "../comment/controller";
import * as commentService from "../comment/service";

jest.mock("../comment/service");

describe("listComments", () => {
  const mockRequest = (query: any = {}, body: any = {}) =>
    ({
      query,
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

  it("should return 200 and list of comments on success", async () => {
    const req = mockRequest(
      { page: "1", sizePage: "10", order: "desc" },
      { userId: 1 }
    );
    const res = mockResponse();

    const mockComments = [
      { id: 1, body: "Lorem Ipsum", user_id: 1, post_id: 1 },
      { id: 2, body: "Lorem Ipsum2", user_id: 1, post_id: 1 },
    ];
    (commentService.listComments as jest.Mock).mockResolvedValue(mockComments);

    await listComments(req, res);

    expect(commentService.listComments).toHaveBeenCalledWith(1, 10, "desc", 1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ comments: mockComments });
  });

  it("should return 422 and validation error on invalid input", async () => {
    const req = mockRequest(
      { page: "invalid", sizePage: "10", order: "desc" },
      { userId: 1 }
    );
    const res = mockResponse();

    await listComments(req, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Validation error.",
      })
    );
  });

  it("should return 500 and internal server error on unexpected error", async () => {
    const req = mockRequest(
      { page: "1", sizePage: "10", order: "desc" },
      { userId: 1 }
    );
    const res = mockResponse();

    const error = new Error("Unexpected error");
    (commentService.listComments as jest.Mock).mockRejectedValue(error);

    await listComments(req, res);

    expect(commentService.listComments).toHaveBeenCalledWith(1, 10, "desc", 1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      message: "Internal server error.",
    });
  });
});
