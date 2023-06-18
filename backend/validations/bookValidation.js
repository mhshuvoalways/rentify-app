const bookValidation = (value) => {
  const error = {};
  if (!value.price) {
    error.price = "Please provide price";
  }
  if (!value.quantity) {
    error.quantity = "Please provide quantity";
  }
  if (value.dates === null || value.dates.length < 0) {
    error.dates = "Please select date";
  }

  let isValid = Object.keys(error).length === 0;
  return {
    error,
    isValid,
  };
};

module.exports = bookValidation;
