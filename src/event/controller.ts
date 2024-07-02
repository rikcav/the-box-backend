import express from "express";
import * as service from "./service";
import { ZodError, z } from "zod";
import dayjs from "dayjs";
import { HttpException } from "../errors/http-exception";

export const listEvents = async (
    request: express.Request,
    response: express.Response
  ) => {
    const listEventsSchema = z.object({
      startDate: z.coerce
        .date()
        .default(new Date())
        .transform((date) => dayjs(date)),
      endDate: z.coerce
        .date()
        .default(dayjs().add(1, "month").toDate())
        .transform((date) => dayjs(date)),
    });
  
    try {
      const { startDate, endDate } = listEventsSchema.parse(request.query);
  
      const events = await service.listEvents(startDate, endDate);
  
      return response.status(200).send({ events });
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