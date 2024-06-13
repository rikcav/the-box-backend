import express from "express";
import * as postService from "../post/service";
import { getPosts, getPostsByCategory, getPost } from "../post/controller";

jest.mock("../post/service");

describe("Find posts", () => {
  const mockRequest = (query: any = {}, params: any = {}) =>
    ({
      query,
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

  describe("getPosts", () => {
    it("should return 200 and posts on success", async () => {
      const req = mockRequest({ page: "1", size: "10" });
      const res = mockResponse();

      const mockPosts = [{ id: 1, title: "Test Post" }];
      (postService.getPosts as jest.Mock).mockResolvedValue(mockPosts);

      await getPosts(req, res);

      expect(postService.getPosts).toHaveBeenCalledWith(1, 10);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockPosts);
    });

    it("should return 400 on error", async () => {
      const req = mockRequest();
      const res = mockResponse();

      (postService.getPosts as jest.Mock).mockRejectedValue(new Error("Error"));

      await getPosts(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith();
    });
  });

  describe("getPostsByCategory", () => {
    it("should return 200 and posts by category on success", async () => {
      const req = mockRequest(
        { page: "1", size: "10" },
        { category: "TECHNOLOGY" }
      );
      const res = mockResponse();

      const mockPosts = [{ id: 1, title: "Tech Post" }];
      (postService.getPostsByCategory as jest.Mock).mockResolvedValue(
        mockPosts
      );

      await getPostsByCategory(req, res);

      expect(postService.getPostsByCategory).toHaveBeenCalledWith(
        "TECHNOLOGY",
        1,
        10
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockPosts);
    });

    it("should return 400 on error", async () => {
      const req = mockRequest({}, { category: "TECHNOLOGY" });
      const res = mockResponse();

      (postService.getPostsByCategory as jest.Mock).mockRejectedValue(
        new Error("Error")
      );

      await getPostsByCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith();
    });
  });

  describe("getPost", () => {
    it("should return 200 and post on success", async () => {
      const req = mockRequest({}, { id: "1" });
      const res = mockResponse();

      const mockPost = { id: 1, title: "Test Post" };
      (postService.getPost as jest.Mock).mockResolvedValue(mockPost);

      await getPost(req, res);

      expect(postService.getPost).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockPost);
    });

    it("should return 400 on error", async () => {
      const req = mockRequest({}, { id: "1" });
      const res = mockResponse();

      (postService.getPost as jest.Mock).mockRejectedValue(new Error("Error"));

      await getPost(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        message: "Could get post",
        error: new Error("Error"),
      });
    });
  });
});
