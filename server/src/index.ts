import app from "./app";
import { config } from "./config/env";
import { connect } from "./config/db";
import logger from "./utils/logger";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string } | null | undefined;
    }
  }
}

app.listen(config.port, "0.0.0.0", () => {
  connect(config.dbUri);
  logger.info(`Server started on port ${config.port}`);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});
process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception thrown:", error);
  process.exit(1);
});
