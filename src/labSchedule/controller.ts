import express from "express";
import * as service from "./service";
import { ZodError } from "zod";

export const getAllLabSchedules = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const labs = await service.getAll();
    res.status(200).send(labs);
  } catch (error) {
    res.status(400).send({ message: "Could not get labs. ", error: error });
  }
};

export const getLabScheduleById = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const id = parseInt(req.params.id);
    const labSchedule = await service.get(id);
    res.status(200).json(labSchedule);
  } catch (error) {
    res.status(404).json({ message: "Lab Schedule not found" });
  }
};

export const create = async (req: express.Request, res: express.Response) => {
  try {
    const labSchedule = await service.create(req.body);
    res.status(201).send(labSchedule);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send({ message: "Validation error: ", error });
    }
    res.status(400).send({ message: "Could not create lab schedule", error });
  }
};

export const update = async (req: express.Request, res: express.Response) => {
  try {
    const labSchedule = await service.update(parseInt(req.params.id), req.body);
    console.log("Lab schedule updated: ", labSchedule);
    res.status(204).send();
  } catch (error) {
    if (error instanceof ZodError) {
      res
        .status(400)
        .send({ message: "Validation error: ", error: error.errors });
    }
    res
      .status(400)
      .send({ message: "Could not update lab schedule: ", error: error });
  }
};

export const remove = async (req: express.Request, res: express.Response) => {
  try {
    const id = parseInt(req.params.id);
    const userId = parseInt(req.params.userid);
    const labSchedule = await service.deleteById(id, userId);
    console.log("Lab schedule deleted: ", labSchedule);
    res.status(204).send();
  } catch (error) {
    res.status(400).send({ message: "Could not delete lab schedule", error });
  }
};
