import { config } from "../config/env";
import { connect } from "./../config/db";
import Lead from "../models/lead.model";
import Auth from "../models/auth.model";
import leadsData from "../data/leads";
import authData from "../data/auth";
import logger from "../utils/logger";

const startSeeding = async () => {
  logger.info("starting seeding...");
  await connect(config.dbUri);
  logger.info("Database connected For Seeding");
  await Lead.deleteMany({});
  logger.info("Old leads removed");
  await Lead.insertMany(leadsData);
  logger.info("New leads added");

  //
  logger.info("starting seeding auth data...");
  await Auth.deleteMany({});
  logger.info("Old auth removed");
  await Auth.insertMany(authData);
  logger.info("New auth data added");

  process.exit(0);
};

startSeeding();
