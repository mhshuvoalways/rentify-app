const categoryValidation = (value) => {
  const error = {};
  if (!value.name) {
    error.name = "Please provide your name";
  }
  if (!value.image) {
    error.image = "Please provide your image";
  }

  let isValid = Object.keys(error).length === 0;
  return {
    error,
    isValid,
  };
};

module.exports = categoryValidation;
