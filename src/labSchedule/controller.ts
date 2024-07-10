import express from "express";
import * as labScheduleService from "./service";
import { ZodError } from "zod";

export const getAllLabs = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const labs = await labScheduleService.getAll();
    res.status(200).send(labs);
  } catch (error) {
    res.status(400).send({ message: "Could not get labs. ", error: error });
  }
};

export const getLabScheduleById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = parseInt(req.params.id);
    const labSchedule = await labScheduleService.get(id);
    res.status(200).json(labSchedule);
  } catch (error) {
    res.status(404).json({ message: "Lab Schedule not found" });
  }
};

export const update = async (req: express.Request, res: express.Response) => {
  try {
    const lab = await labScheduleService.update(
      parseInt(req.params.id),
      req.body
    );
    console.log("Lab updated: ", lab);
    res.status(204).send();
  } catch (error) {
    if (error instanceof ZodError) {
      res
        .status(400)
        .send({ message: "Validation error: ", error: error.errors });
    }
    res.status(400).send({ message: "Could not update lab: ", error: error });
  }
};
