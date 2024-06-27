import { prisma } from "../prisma/service";

export const findBetweenDates = async (startDate: Date, endDate: Date) => {
  return await prisma.event.findMany({
    where: {
      OR: [
        {
          start_date: { gte: startDate, lte: endDate },
          end_date: { gte: startDate, lte: endDate },
          AND: {start_date: {lte:startDate}, end_date: {lte: endDate}}
        },
      ],
    },
  });
};
