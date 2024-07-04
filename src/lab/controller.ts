import express from "express";
import * as service from "./service";
import { ZodError } from "zod";

export const getAll = async (req: express.Request, res: express.Response) => {
  try {
    const labs = await service.getAll();
    res.status(200).send(labs);
  } catch (error) {
    res.status(400).send({ message: "Could not get labs: ", error: error });
  }
};

export const get = async (req: express.Request, res: express.Response) => {
  try {
    const lab = await service.get(parseInt(req.params.id));
    res.status(200).send(lab);
  } catch (error) {
    res.status(400).send({ message: "Could not get lab: ", error: error });
  }
};

export const create = async (req: express.Request, res: express.Response) => {
  try {
    const lab = await service.create(req.body);
    res.status(201).send(lab);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send({ message: "Validation error: ", error: error });
    }
    res.status(400).send({ message: "Could not create lab: ", error: error });
  }
};

export const update = async (req: express.Request, res: express.Response) => {
  try {
    const lab = await service.update(parseInt(req.params.id), req.body);
    console.log("Lab updated: ", lab);
    res.status(204).send();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send({ message: "Validation error: ", error: error });
    }
    res.status(400).send({ message: "Could not update lab: ", error: error });
  }
};

export const deleteById = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const lab = await service.deleteById(parseInt(req.params.id));
    console.log(lab);
    res.status(200).send();
  } catch (error) {
    res.status(400).send({ message: "Could not delete lab: ", error: error });
  }
};
