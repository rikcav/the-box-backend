import dayjs from "dayjs";
import * as repository from "./repository";
import { ConflictException } from "../errors/conflict-exception";

export const listEvents = async (
    startDate: dayjs.Dayjs,
    endDate: dayjs.Dayjs
  ) => {
    if (startDate.isAfter(endDate)) {
      throw new ConflictException("endDate cannot be before startDate!")
    }
  
    return await repository.findBetweenDates(startDate.toDate(), endDate.toDate());
  };