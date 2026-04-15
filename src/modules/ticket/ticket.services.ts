import { and, eq } from "drizzle-orm";
import db from "../../common/config/db.config.js";
import ticket from "./ticket.model.js";
import ApiError from "../../common/utils/api-error.js";

const bookTicket = async function (userId: string, seatNo: string) {
  await db.transaction(async (tx) => {
    const seat = await tx
      .select()
      .from(ticket)
      .where(and(eq(ticket.seatNo, seatNo), eq(ticket.isBooked, false)))
      .for("update");

    if (seat.length === 0) {
      throw ApiError.badRequest("Seat not exists");
    }

    if (seat[0]!.isBooked) {
      throw ApiError.conflict("Seat already booked");
    }
    console.log(userId);

    await tx
      .update(ticket)
      .set({ isBooked: true, userId, bookedAt: new Date() })
      .where(eq(ticket.seatNo, seatNo));
  });
  return seatNo;
};

const getBookedTickets = async function () {
  const bookedTickets = await db
    .select({ seatNo: ticket.seatNo })
    .from(ticket)
    .where(eq(ticket.isBooked, true));
  return bookedTickets;
};

const getUnbookedTickets = async function () {
  const unbookedTickets = await db
    .select({ seatNo: ticket.seatNo })
    .from(ticket)
    .where(eq(ticket.isBooked, false));
  return unbookedTickets;
};

const getAllTickets = async function () {
  const allTickets = await db.select({ seatNo: ticket.seatNo }).from(ticket);
  return allTickets;
};

export { bookTicket, getBookedTickets, getAllTickets, getUnbookedTickets };
