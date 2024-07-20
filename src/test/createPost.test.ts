import express from "express";
import { ZodError } from "zod";
import { createPost as createPostController } from "../post/controller";
import { createPost } from "../post/service";

jest.mock("../post/service");

describe("createPost", () => {
  const mockRequest = (body: any) =>
    ({
      body,
    }) as express.Request;

  const mockResponse = () => {
    const res: Partial<express.Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res as express.Response;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 and created post on success", async () => {
    const req = mockRequest({
      title: "Lorem Ipsum",
      content: "Lorem Ipsum dolor sit amet",
      category: "TECHNOLOGY",
      user_id: 1,
    });
    const res = mockResponse();

    const mockPost = {
      id: 1,
      title: "Lorem Ipsum",
      content: "Lorem Ipsum dolor sit amet",
      category: "TECHNOLOGY",
      user_id: 1,
    };

    (createPost as jest.Mock).mockResolvedValue(mockPost);

    await createPostController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      message: "Registered",
      post: mockPost,
    });
  });

  it("should return 400 if validation fails", async () => {
    const req = mockRequest({
      title: "Lorem Ipsum",
      content: "Lorem Ipsum dolor sit amet",
      category: "TECHNOLOGY",
      user_id: 1,
    });
    const res = mockResponse();

    const validationError = new ZodError([]);

    (createPost as jest.Mock).mockRejectedValue(validationError);

    await createPostController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      message: "Validation failed",
      errors: validationError,
    });
  });

  it("should return 400 on other errors", async () => {
    const req = mockRequest({
      title: "Lorem Ipsum",
      content: "Lorem Ipsum dolor sit amet",
      category: "TECHNOLOGY",
      user_id: 1,
    });
    const res = mockResponse();

    const error = new Error("Some error");

    (createPost as jest.Mock).mockRejectedValue(error);

    await createPostController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      message: "Could not create post",
      error,
    });
  });
});
