const ApiError = require("../../error/handleApiError");
const ValidationError = require("../../error/handleValidationError");
const CastError = require("../../error/handleCastError");

const globalErrorHandler = (error, req, res, next) => {
  let status = 500;
  let message = "Something went wrong";
  let errorMessages = [];

  if (error?.name === "ValidationError") {
    const simplifiedError = ValidationError(error);
    status = simplifiedError.status;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errors;
  } else if (error?.name === "CastError") {
    const simplifiedError = CastError(error);
    status = simplifiedError.status;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errors;
  } else if (error instanceof ApiError) {
    status = error?.status;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }
  res.status(status).json({
    success: false,
    message,
    errorMessages,
    stack: error?.stack,
    //stack: config.env !== "production" ? error?.stack : undefined,
  });
};

module.exports = globalErrorHandler;
