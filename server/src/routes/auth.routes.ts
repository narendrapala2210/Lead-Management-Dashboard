import { Router } from "express";

import controller from "../controller/auth.controller";

const rr = Router();

rr.post("/login", controller.login);
export default rr;
