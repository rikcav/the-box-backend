import express from "express";
import { ZodError, date, z } from "zod";
import { HttpException } from "../errors/http-exception";
import * as LabScheduleService from "./service";
import dayjs from "dayjs";

export const createLabSchedule = async (
  request: express.Request,
  response: express.Response
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

    const labSchedule = await LabScheduleService.createLabSchedule(
      LabScheduleDTO
    );

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
