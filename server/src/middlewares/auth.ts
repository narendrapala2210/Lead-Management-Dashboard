import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import logger from "../utils/logger";
import { CustomError } from "./errorhandler";
import { config } from "../config/env";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    logger.warn("Access attempt without valid token!");
    return next(new CustomError("Authentication required", 401));
  }

  const JWT_SECRET = config.jwtSecretKey;
  const decode = jwt.verify(token, JWT_SECRET) as { id: string } | null;
  if (!decode) {
    logger.warn("Invalid token!");
    return next(new CustomError("Invalid token", 401));
  }
  req.user = { id: decode.id };
  next();
};

export default authenticate;
