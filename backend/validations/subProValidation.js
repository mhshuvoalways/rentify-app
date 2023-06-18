const productValidation = (value) => {
  const error = {};

  if (!value.title) {
    error.title = "Please provide product title";
  }
  if (!value.type) {
    error.type = "Please provide product type";
  }
  if (!value.availability) {
    error.availability = "Please provide product availability";
  }
  let isValid = Object.keys(error).length === 0;
  return {
    error,
    isValid,
  };
};

module.exports = productValidation;
