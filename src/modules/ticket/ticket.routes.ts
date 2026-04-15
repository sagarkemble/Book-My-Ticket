import { Router } from "express";
import validateDto from "../../common/middleware/validate-dto.middleware.js";
import bookTicketDto from "./dto/book-ticket.dto.js";
import * as ticketController from "./ticket.controller.js";
import { authenticate } from "./../auth/auth.middleware.js";
const ticketRouter: Router = Router();

ticketRouter.put(
  "/book",
  authenticate,
  validateDto(bookTicketDto),
  ticketController.bookTicket,
);
ticketRouter.get("/booked", ticketController.getBookedTickets);
ticketRouter.get("/unbooked", ticketController.getUnbookedTickets);
ticketRouter.get("/all", ticketController.getAllTickets);

export default ticketRouter;
