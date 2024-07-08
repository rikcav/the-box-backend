import express from "express";
import * as service from "./service";
import { ZodError } from "zod";

export const getAll = async (req: express.Request, res: express.Response) => {
  try {
    const events = await service.getAll();
    res.status(200).send(events);
  } catch (error) {
    res.status(400).send({ message: "Could not find events", error: error });
  }
};

export const get = async (req: express.Request, res: express.Response) => {
  try {
    const event = await service.get(parseInt(req.params.id));
    res.status(200).send(event);
  } catch (error) {
    res.status(404).send({ message: "Could not find event", error: error });
  }
};

export const create = async (req: express.Request, res: express.Response) => {
  try {
    const event = await service.create(req.body);
    res.status(201).send(event);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send({ message: "Validation error", error: error });
    } else {
      res.status(400).send({ message: "Could create new event", error: error });
    }
  }
};

export const update = async (req: express.Request, res: express.Response) => {
  try {
    const event = await service.update(parseInt(req.params.id), req.body);
    console.log(`Updated event: ${event}`);
    res.status(204).send();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send({ message: "Validation error", error: error });
    } else {
      res.status(400).send({ message: "Could create new event", error: error });
    }
  }
};

export const remove = async (req: express.Request, res: express.Response) => {
  try {
    const event = await service.remove(parseInt(req.params.id));
    console.log(`Delete event: ${event}`);
    res.status(204).send();
  } catch (error) {
    res.status(400).send({ message: "Could not remove event", error: error });
  }
};
