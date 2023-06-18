const orderValidation = (value) => {
  const error = {};
  if (!value.name) {
    error.name = "Please provide name";
  }
  if (!value.email) {
    error.email = "Please provide email";
  }
  if (!value.villa) {
    error.villa = "Please provide villa";
  }
  if (!value.phone) {
    error.phone = "Please provide phone";
  }
  let isValid = Object.keys(error).length === 0;
  return {
    error,
    isValid,
  };
};

module.exports = orderValidation;
