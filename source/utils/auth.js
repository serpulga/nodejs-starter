import LocalStrategy from "passport-local";
import expressJWT from "express-jwt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import _ from "lodash";
import * as users from "~/models/users";

// in a real app this would be set in an environment variable
const secret = "secret";

// reducing the iterations to 1 in non-production environments to make it faster
const iterations = process.env.NODE_ENV === "production" ? 1000 : 1;

// seconds/minute * minutes/hour * hours/day * 60 days
const sixtyDaysInSeconds = 60 * 60 * 24 * 60;
// to keep our tests reliable, we'll use the requireTime if we're not in production
// and we'll use Date.now() if we are.no
const requireTime = Date.now();
const now = () =>
  process.env.NODE_ENV === "production" ? Date.now() : requireTime;

function getSaltAndHash(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, iterations, 512, "sha512")
    .toString("hex");
  return { salt, hash };
}

function isPasswordValid(password, { salt, hash }) {
  return (
    hash ===
    crypto.pbkdf2Sync(password, salt, iterations, 512, "sha512").toString("hex")
  );
}

function getUserToken({ id, email }) {
  const issuedAt = Math.floor(now() / 1000);
  return jwt.sign(
    {
      id,
      email,
      iat: issuedAt,
      exp: issuedAt + sixtyDaysInSeconds,
    },
    secret,
  );
}

const authMiddleware = expressJWT({ algorithms: ["HS256"], secret });

function getLocalStrategy() {
  return new LocalStrategy(async (email, password, done) => {
    let user;
    try {
      user = await users.getByEmail(email);
    } catch (error) {
      return done(error);
    }
    if (!user || !isPasswordValid(password, user)) {
      return done(null, false, {
        message: "email or password is invalid",
      });
    }
    return done(null, userToJSON(user));
  });
}

function userToJSON(user) {
  return _.omit(user, ["exp", "iat", "hash", "salt"]);
}

function isPasswordAllowed(password) {
  return (
    password.length > 6 &&
    // non-alphanumeric
    /\W/.test(password) &&
    // digit
    /\d/.test(password) &&
    // capital letter
    /[A-Z]/.test(password) &&
    // lowercase letter
    /[a-z]/.test(password)
  );
}

export {
  authMiddleware,
  getSaltAndHash,
  userToJSON,
  getLocalStrategy,
  getUserToken,
  isPasswordAllowed,
};
