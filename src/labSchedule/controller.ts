import express from "express";
import { ZodError, date, z } from "zod";
import { HttpException } from "../errors/http-exception";
import * as service from "./service";
import dayjs from "dayjs";
import express  from "express"
import * as service from './service';
import { ZodError } from "zod";

export const createLabSchedule = async (
  request: express.Request,
  response: express.Response,
) => {
  const createLabScheduleSchema = z.object({
    startTime: z.coerce.string().transform((date) => dayjs(date)),
    endTime: z.coerce.string().transform((date) => dayjs(date)),
    date: z.coerce.date().transform((date) => dayjs(date)),
    userId: z.coerce.number().int(),
    labId: z.coerce.number().int(),
  });

  try {
    const LabScheduleDTO = createLabScheduleSchema.parse(request.body);

    const labSchedule = await service.createLabSchedule(LabScheduleDTO);

    return response.status(201).send(labSchedule);
  } catch (error) {
    if (error instanceof ZodError) {
      return response.status(422).send({
        message: "Validation error.",
        issues: error.format(),
      });
    }

    if (error instanceof HttpException) {
      return response.status(error.status).send({ message: error.message });
    }

    console.error(error);
    return response.status(500).send({ message: "Internal server error." });
    }
};
=======


export const getAllLabs = async (req: express.Request, res: express.Response) => {
  try {
    const labs = await service.getAll();
    res.status(200).send(labs);
  } catch (error) {
    res.status(400).send({ message: "Could not get labs. ", error: error });
  }
};

export const getLabScheduleById = async (req: express.Request, res: express.Response) => {
  try {
    const id = parseInt(req.params.id);
    const labSchedule = await service.get(id);
    res.status(200).json(labSchedule);
} catch (error) {
    res.status(404).json({ message: "Lab Schedule not found" });
  }
};

export const getLabSchedulesByLabId = async (req: express.Request, res: express.Response) => {
  try {
    const labId = parseInt(req.params.id);
    const labSchedules = await service.getByLabId(labId);
    res.status(200).json(labSchedules);
  } catch (error) {
    res.status(400).json({ message: "Could not get lab schedules", error: error });
  }
};

export const update = async (req: express.Request, res: express.Response) => {
  try {
    const lab = await service.update(parseInt(req.params.id), req.body);
    console.log("Lab updated: ", lab);
    res.status(204).send();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send({ message: "Validation error: ", error: error.errors });
    }
    res.status(400).send({ message: "Could not update lab: ", error: error });
  }
};