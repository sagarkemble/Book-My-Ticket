import { type Response, type Request, type NextFunction } from "express";
import * as authService from "./auth.services.js";
import ApiResponse from "../../common/utils/api-response.js";
import ApiError from "../../common/utils/api-error.js";

const register = async function (req: Request, res: Response) {
  const userData = await authService.register(req.body);
  ApiResponse.ok(
    res,
    "Registration successful. Please verify your email.",
    userData,
  );
};

const verifyEmail = async function (req: Request, res: Response) {
  if (!req.query.verificationToken)
    throw ApiError.badRequest("Verification token is required");
  const result = await authService.verifyEmail(
    req.query.verificationToken as string,
  );
  ApiResponse.html(res, result.html, result.type);
};

const login = async function (req: Request, res: Response) {
  const { userObj, refreshToken, accessToken } = await authService.login(
    req.body,
  );
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });
  ApiResponse.ok(res, "Login successful.", userObj);
};

const refreshAccessToken = async function (req: Request, res: Response) {
  const refreshToken = req.cookies?.refreshToken;
  console.log(refreshToken);

  const { accessToken, refreshToken: newRefreshToken } =
    await authService.refreshAccessToken(refreshToken);
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  ApiResponse.ok(res, "Access Token Refreshed", { accessToken });
};

const logout = async function (req: Request, res: Response) {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  await authService.logout(req.user!.id);
  ApiResponse.ok(res, "User logged out successfully");
};
export { register, verifyEmail, login, refreshAccessToken, logout };
