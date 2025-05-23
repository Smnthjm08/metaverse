import bcrypt from "bcrypt";
import jwt, { VerifyOptions } from "jsonwebtoken";
import { JWT_SECRET } from "../configs/env";

export interface userTypes {
  id: string;
  email: string;
}

export type AccessTokenPayload = {
  userId: string;
  sessionId: number;
};

export const encryptPassword = (password: string, saltRounds: number) => {
  return bcrypt.hash(password, saltRounds || 10);
};

export const comparePassword = (plain: string, hashed: string) => {
  return bcrypt.compare(plain, hashed);
};

export const generateAccessToken = (user: userTypes) => {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "40m",
  });
};

export const generateRefreshToken = (user: userTypes) => {
  return jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = <TPayload extends object = AccessTokenPayload> (
  token: string,
  options?: VerifyOptions & { secret: string }
) => {
  const { secret = JWT_SECRET, ...verifyOptions } = options || {};
  try {
    const payload = jwt.verify(token, secret, {
      // needs fix
      // ...defaults,
      ...verifyOptions,
    }) as TPayload;
    return { payload };
  } catch (error: any) {
    return { error: error.message };
  }
};
