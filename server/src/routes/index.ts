import { Router } from "express";

import authRoutes from "./auth.routes";
import leadRoutes from "./lead.routes";
import authenticate from "../middlewares/auth";

const rr = Router();
rr.use("/auth", authRoutes);
rr.use("/leads", authenticate, leadRoutes);

export default rr;
