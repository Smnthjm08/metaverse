/**
 * Asserts a condition and throws an error if the condition is false.
 */
import assert from "node:assert";
import AppError from "./error.utils";
import { HttpStatusCode } from "../constants/http-status.code";
import AppErrorCode from "../constants/error.code";

type AppAssert = (
  condition: any,
  HttpStatusCode: HttpStatusCode,
  message: string,
  AppErrorCode?: AppErrorCode
) => asserts condition;

const appAssert: AppAssert = (
  condition,
  httpStatusCode,
  message,
  AppErrorCode?
) => assert(condition, new AppError(httpStatusCode, message, AppErrorCode));

export default appAssert;
