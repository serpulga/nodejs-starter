import pino from "pino";
import pkg from "../package.json";

const isTest = process.env.NODE_ENV === "test";
const isProduction = process.env.NODE_ENV === "production";
const level =
  process.env.LOG_LEVEL || isTest ? "warn" : !isProduction ? "debug" : "info";

const options = { level, name: pkg.name };

if (!isProduction || !isTest) {
  options.prettyPrint = {
    translateTime: "HH:MM:ss",
    ignore: "pid,hostname",
  };
}

export default pino(options);
