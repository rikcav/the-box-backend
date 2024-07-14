import express from "express";
import * as service from "./service";
import { ZodError } from "zod";

export const getAll = async (req: express.Request, res: express.Response) => {
  try {
    const event_schedules = await service.getAll();
    res.status(200).send(event_schedules);
  } catch (error) {
    res.status(400).send({ message: `Could not get event schedules`, error });
  }
};

export const getByScheduleId = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const event_schedules = await service.getByScheduleId(
      parseInt(req.params.id),
    );
    res.status(200).send(event_schedules);
  } catch (error) {
    res
      .status(404)
      .send({ message: `Could not get event schedules by schedule id`, error });
  }
};

export const get = async (req: express.Request, res: express.Response) => {
  try {
    const event_schedule = await service.get(parseInt(req.params.id));
    res.status(200).send(event_schedule);
  } catch (error) {
    res.status(404).send({ message: `Could not get event schedule`, error });
  }
};

export const create = async (req: express.Request, res: express.Response) => {
  try {
    const event_schedule = await service.create(req.body);
    res.status(201).send(event_schedule);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send({ message: "Validation error", error });
    } else {
      res
        .status(400)
        .send({ message: `Could not create event schedule`, error });
    }
  }
};

export const update = async (req: express.Request, res: express.Response) => {
  try {
    const id = parseInt(req.params.id);
    const event_schedule = await service.update(id, req.body);
    console.log(event_schedule);
    res.status(204).send();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send({ message: "Validation error", error });
    } else {
      res
        .status(400)
        .send({ message: `Could not create event schedule`, error });
    }
  }
};

export const remove = async (req: express.Request, res: express.Response) => {
  try {
    const event_schedule = await service.remove(parseInt(req.params.id));
    console.log(event_schedule);
    res.status(204).send();
  } catch (error) {
    res.status(404).send({ message: `Could not get event schedule`, error });
  }
};
