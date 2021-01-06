import "express-async-errors";
import express from "express";
import cors from "cors";
import passport from "passport";
import { getLocalStrategy } from "./utils/auth";
import errorMiddleware from "./utils/error-middleware";
import logger from "./logger";
import routes from "./routes";

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(passport.initialize());
server.use("/api", routes);
// the error middleware must be used last
server.use(errorMiddleware);

passport.use(getLocalStrategy());

// start the server on next event loop
setImmediate(() => {
  const port = process.env.HTTP_PORT || 3000;
  const host = process.env.HTTP_HOST || "127.0.0.1";

  server.listen(port, host, () => {
    logger.info(`Server started ${host}:${port}`);
  });
});

export default server;
