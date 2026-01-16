import express from "express";
import { errorHandler } from "./middlewares/errorhandler";
import routers from "./routes";
import cors from "cors";

const app = express();

// middlewares
app.use(express.json()); // parsing application/json
app.use(cors({ origin: "*" }));
app.use("/api", routers); // mount all routers

// global error handler
app.use(errorHandler);

export default app;
