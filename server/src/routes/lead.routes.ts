import { Router } from "express";

import controller from "../controller/lead.controller";

const rr = Router();

rr.get("/", controller.getAllLeads); // get all leads with pagination
rr.get("/stats", controller.getLeadStats); // get lead statistics
rr.get("/:id", controller.getLeadById); // get lead by ID

export default rr;
