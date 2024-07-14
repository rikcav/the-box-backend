import express from "express";
import * as service from "./service";
import { ZodError } from "zod";

export const getAll = async (req: express.Request, res: express.Response) => {
  try {
    const schedules = await service.getAll();
    res.status(200).send(schedules);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send(error);
    }
    res.status(400).send(error);
  }
};

export const get = async (req: express.Request, res: express.Response) => {
  try {
    const schedule = await service.get(parseInt(req.params.id));
    res.status(200).send(schedule);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send({ message: `Validation error`, error: error });
    }
    res.status(404).send(error);
  }
};

export const create = async (req: express.Request, res: express.Response) => {
  try {
    const schedule = await service.create(req.body);
    res.status(201).send(schedule);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send({ message: `Validation error`, error: error });
    }
    res.status(400).send(error);
  }
};

export const update = async (req: express.Request, res: express.Response) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const schedule = await service.update(id, data);

    console.log(`Updated schedule: ${schedule}`);
    res.status(204).send();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send({ message: `Validation error`, error: error });
    }
    res.status(400).send(error);
  }
};

export const remove = async (req: express.Request, res: express.Response) => {
  try {
    const schedule = await service.remove(parseInt(req.params.id));
    console.log(`Deleted: ${schedule}`);
    res.status(204).send();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send({ message: `Validation error`, error: error });
    }
    res.status(404).send(error);
  }
};
