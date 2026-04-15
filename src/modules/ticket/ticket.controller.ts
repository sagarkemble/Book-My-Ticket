import { type Response, type Request, type NextFunction } from "express";
import * as ticketService from "./ticket.services.js";
import ApiResponse from "../../common/utils/api-response.js";

const bookTicket = async function (req: Request, res: Response) {
  const ticketData = await ticketService.bookTicket(
    req.user?.id as string,
    req.body.seatNo,
  );
  ApiResponse.ok(res, "Ticket booked successfully.", { ticketData });
};

const getBookedTickets = async function (req: Request, res: Response) {
  const tickets = await ticketService.getBookedTickets();
  ApiResponse.ok(res, "Booked tickets retrieved successfully.", { tickets });
};

const getUnbookedTickets = async function (req: Request, res: Response) {
  const tickets = await ticketService.getUnbookedTickets();
  ApiResponse.ok(res, "Unbooked tickets retrieved successfully.", { tickets });
};

const getAllTickets = async function (req: Request, res: Response) {
  const tickets = await ticketService.getAllTickets();
  ApiResponse.ok(res, "All tickets retrieved successfully.", { tickets });
};

export { bookTicket, getBookedTickets, getUnbookedTickets, getAllTickets };
