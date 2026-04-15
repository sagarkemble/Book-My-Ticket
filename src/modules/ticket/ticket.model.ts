import {
  integer,
  uuid,
  pgTable,
  varchar,
  boolean,
  timestamp,
  text,
} from "drizzle-orm/pg-core";
import usersTable from "../auth/auth.model.js";

const ticket = pgTable("tickets", {
  id: uuid().primaryKey().defaultRandom(),
  seatNo: varchar("seat_no", { length: 10 }).unique().notNull(),
  isBooked: boolean("is_booked").default(false).notNull(),
  userId: uuid("user_id").references(() => usersTable.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  bookedAt: timestamp("booked_at"),
});

export default ticket;
