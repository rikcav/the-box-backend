import * as lSRepository from "./repository";
import { CreateLabSchedule } from "./repository";
import * as userService from "../user/service";
import { validation } from "./validation";
import { ZodDate, ZodDateCheck } from "zod";
import dayjs from "dayjs";
import * as LabScheduleRepository from "./repository";
import { ConflictException } from "../errors/conflict-exception";

ZodDate;
interface LabScheduleDto {
  startTime: dayjs.Dayjs;
  endTime: dayjs.Dayjs;
  date: dayjs.Dayjs;
  userId: number;
  labId: number;
}

export const getAll = async () => {
  try {
    const labSchedules = await lSRepository.getAll();
    return labSchedules;
  } catch (error) {
    throw error;
  }
};

export const get = async (id: number) => {
  try {
    const labSchedule = await lSRepository.get(id);
    return labSchedule;
  } catch (error) {
    throw error;
  }
};

export const createLabSchedule = async ({
  startTime,
  endTime,
  date,
  labId,
  userId,
}: LabScheduleDto) => {

  if(date.day() == 0 || date.day() == 6) {
    throw new ConflictException("weekend bookings are not allowed!");
  }
  
  if (startTime.add(30, "millisecond").isBefore(endTime)) {
    throw new ConflictException("Very little time, put at least 30 minutes!");
  }

  if (
    !(
      (startTime.isAfter("07:30:00") && startTime.isBefore("12:00:00")) ||
      (startTime.isAfter("13:30:00") && startTime.isBefore("21:00:00")) ||
      !(
        (endTime.isBefore("08:00:00") && endTime.isAfter("12:30:00")) ||
        (endTime.isBefore("14:00:00") && endTime.isAfter("21:30:00"))
      )
    )
  ) {
    throw new ConflictException("Invalid schedules!");
  }
  const conflictSchedule = await LabScheduleRepository.findScheduleDate(
    labId,
    date.toDate(),
    startTime.toDate(),
    endTime.toDate()
  );

  if (conflictSchedule.length) {
    throw new ConflictException("Conflict of schedules!");
  }

  const labSchedule = await LabScheduleRepository.create({
    date: date.toDate(),
    end_time: endTime.toDate(),
    lab_id: labId,
    start_time: startTime.toDate(),
    user_id: userId,
  });

  return {
    id: labSchedule.id,
    labId,
    date: date.toDate(),
    startTime: startTime.toDate(),
    endTime: endTime.toDate(),
  };
};

export const update = async (id: number, lSData: CreateLabSchedule) => {
  try {
    const user = await userService.getUserById(lSData.user_id);
    if (user?.profile === "SUPER_USER") {
      const data = validation.parse(lSData);
      const labSchedule = await lSRepository.update(id, data);
      return labSchedule;
    } else {
      throw new Error(`Only a SUPER_USER can update a lab schedule`);
    }
  } catch (error) {
    throw error;
  }
};

export const deleteById = async (id: number, userId: number) => {
  try {
    const user = await userService.getUserById(userId);
    if (user?.profile === "SUPER_USER") {
      const labSchedule = await lSRepository.deleteById(id);
      console.log("Deleted lab schedule: ", labSchedule);
    } else {
      throw new Error(`Only a SUPER_USER can delete a lab schedule`);
    }
  } catch (error) {
    throw error;
  }
};
