const handleCastError = (error) => {
  const errors = [
    {
      path: error.path,
      message: "Invalid Id",
    },
  ];
  const status = 400;
  return {
    status,
    message: "Cast Error",
    error,
  };
};

module.exports = handleCastError;
