import express from "express";
import { deleteById } from "../comment/controller";
import * as commentService from "../comment/service";

jest.mock("../comment/service");

describe("deleteById", () => {
  const mockRequest = (params: any) =>
    ({
      params,
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

  it("should return 200 on successful deletion", async () => {
    const req = mockRequest({ id: "1" });
    const res = mockResponse();

    (commentService.deleteById as jest.Mock).mockResolvedValue({
      id: 1,
      body: "Lorem Ipsum",
      user_id: 1,
      post_id: 1,
    });

    await deleteById(req, res);

    expect(commentService.deleteById).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith();
  });

  it("should return 404 and error message when comment not found", async () => {
    const req = mockRequest({ id: "1" });
    const res = mockResponse();

    const error = new Error("Comment not found");
    (commentService.deleteById as jest.Mock).mockRejectedValue(error);

    await deleteById(req, res);

    expect(commentService.deleteById).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      message: "Comment not found.",
      errors: error,
    });
  });
});
