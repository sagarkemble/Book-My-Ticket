import type { Request, Response, NextFunction } from "express";
import ApiError from "../../common/utils/api-error.js";
import { verifyAccessToken } from "../../common/utils/jwt.utils.js";
import db from "../../common/config/db.config.js";
import usersTable from "./auth.model.js";
import { eq } from "drizzle-orm";

const authenticate = async function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let token;
  let decoded: { id: string; role: string } | null = null;

  if (req.cookies?.accessToken) token = req.cookies.accessToken;

  if (!token) throw ApiError.unauthorized("Not authenticated");

  try {
    decoded = verifyAccessToken(token) as { id: string; role: string };
  } catch (error) {
    throw ApiError.unauthorized("Invalid or expired token");
  }

  const userResult = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, decoded.id));
  if (userResult.length === 0)
    throw ApiError.unauthorized("User no longer exists");

  const user = userResult.length > 0 ? userResult[0] : null;
  if (!user) throw ApiError.unauthorized("User no longer exists");

  req.user = {
    id: String(user.id),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
  next();
};

export { authenticate };
