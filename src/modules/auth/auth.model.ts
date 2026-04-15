import {
  uuid,
  pgTable,
  varchar,
  boolean,
  timestamp,
  text,
} from "drizzle-orm/pg-core";

const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  firstName: varchar("first_name", { length: 45 }).notNull(),
  lastName: varchar("last_name", { length: 45 }).notNull(),
  email: varchar("email", { length: 322 }).notNull().unique(),
  isVerified: boolean("is_verified").default(false).notNull(),
  password: varchar("password", { length: 66 }),
  verificationToken: varchar("verification_token"),
  refreshToken: text("refresh_token"),
  createdAt: timestamp("create_at").defaultNow().notNull(),
  updateAt: timestamp("update_at").$onUpdate(() => new Date()),
});

export default usersTable;
