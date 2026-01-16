import mongoose from "mongoose";
import logger from "../utils/logger";

export const connect = async (dbUri: string) => {
  mongoose.connect(dbUri).then(() => {
    logger.info("DB Connected Successfully");
  });
};
