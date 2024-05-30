import express from "express";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    res.status(200).send("Registered");
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
