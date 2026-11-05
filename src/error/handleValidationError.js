const handleValidationError = (error) => {
  const errors = Object.values(error.errors).map((el) => {
    return {
      path: el?.path,
      message: el?.message,
    };
  });
  const status = 400;
  return {
    status,
    message: "Validation error",
    error: errors,
  };
};
module.exports = handleValidationError;
