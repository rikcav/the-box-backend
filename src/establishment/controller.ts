import express from "express";
import * as service from "./service";

export const getAll = async (req: express.Request, res: express.Response) => {
  try {
    const establishments = await service.getAll();
    res.status(200).send(establishments);
  } catch (error) {
    res.status(400).send({ message: "Could not get establishments", error });
  }
};

export const get = async (req: express.Request, res: express.Response) => {
  try {
    const establishment = await service.get(parseInt(req.params.id));
    res.status(200).send(establishment);
  } catch (error) {
    res.status(400).send({ message: "Could not get establishment", error });
  }
};
