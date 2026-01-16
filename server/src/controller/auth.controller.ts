import { Request, Response, NextFunction } from "express";
import { CustomError } from "../middlewares/errorhandler";
import Auth from "../models/auth.model";
import jwt from "jsonwebtoken";

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  const user = await Auth.findOne({ email: email.toLowerCase() }).select(
    "+password"
  );

  if (!user) {
    return next(new CustomError("user details not found", 404));
  }

  // const compared = user.password === password;
  if (user?.password !== req.body.password) {
    return next(new CustomError("Invalid credentials", 401));
  }

  const token = jwt.sign({ id: user._id }, "key");

  const { password, ...rest } = user.toObject();

  res.json({
    status: true,
    message: "retrieve loads details successfully",
    token: token,
    data: rest,
  });
};

export default { login };
