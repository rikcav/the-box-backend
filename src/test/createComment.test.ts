import express from "express";
import { createNewComment } from "../comment/controller";
import * as commentService from "../comment/service";
import { ZodError } from "zod";

jest.mock("../comment/service");

describe("createNewComment", () => {
  const mockRequest = (body: any) =>
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

  it("should return 200 and success message on successful comment creation", async () => {
    const req = mockRequest({
      body: "Lorem Ipsum",
      user_id: 1,
      post_id: 1,
    });
    const res = mockResponse();

    const mockComment = {
      id: 1,
      body: "Lorem Ipsum",
      user_id: 1,
      post_id: 1,
    };
    (commentService.createComment as jest.Mock).mockResolvedValue(mockComment);

    await createNewComment(req, res);

    expect(commentService.createComment).toHaveBeenCalledWith({
      body: "Lorem Ipsum",
      user_id: 1,
      post_id: 1,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      message: "Commented!",
      comment: mockComment,
    });
  });

  it("should return 400 and validation error message on validation error", async () => {
    const req = mockRequest({ body: "", user_id: 1, post_id: 1 });
    const res = mockResponse();

    const validationError = new ZodError([]);
    (commentService.createComment as jest.Mock).mockRejectedValue(
      validationError
    );

    await createNewComment(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      mensage: "Validation failed.",
      errors: validationError,
    });
  });

  it("should return 400 and error message on other errors", async () => {
    const req = mockRequest({
      body: "Lorem ipsum",
      user_id: 1,
      post_id: 1,
    });
    const res = mockResponse();

    const error = new Error("Could not create a comment.");
    (commentService.createComment as jest.Mock).mockRejectedValue(error);

    await createNewComment(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      message: "Could not create a comment.",
      errors: error,
    });
  });
});
