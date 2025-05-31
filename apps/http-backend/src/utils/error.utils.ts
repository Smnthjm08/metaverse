import AppErrorCode from "../constants/error.code";
import { HttpStatusCode } from "../constants/http-status.code";

class AppError extends Error {
  constructor(
    public statusCode: HttpStatusCode,
    public message: string,
    public errorCode?: AppErrorCode
  ) {
    super(message);
  }
}

// new AppError(200, "msg", AppErrorCode.InvalidAccessToken)

export default AppError;
