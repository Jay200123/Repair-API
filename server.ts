import express from "express";
import dotenv from "dotenv";
import { logger } from "./@utils";
import { ErrorMiddleware } from "./@middlewares";
import { repair, unit } from "./@routes";
import { STATUSCODE } from "./@constants";
import cors from "cors";
import { corsOption } from "./@config";

dotenv.config();

const app = express();

/**
 * Middleware to parse incoming JSON payloads.
 * Required for handling requests with "Content-Type: application/json"
 **/
app.use(express.json());

/**
 * Middleware to parse URL-encoded payloads (e.g., from HTML forms).
 * Allows the server to handle form submissions from the frontend.
 * "extended: true" enables parsing of nested objects.
 **/
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOption));

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Repair API called",
  });
});

app.use("/api/v1", repair, unit);

app.all("/*splat", (req, res) => {
  return res.status(STATUSCODE.METHOD_NOT_ALLOWED).json({
    message: "Method not allowed.",
  });
});

/**
 * Error Middleware
 * Handles errors and sends JSON responses
 * Should be the last middleware
 * to catch all errors in the whole express application
 */
const errorMiddleware = new ErrorMiddleware();

app.use(errorMiddleware.errorJson());

app.listen(process.env.PORT, () => {
  logger.info(`Server running on PORT ${process.env.PORT}`);
});
