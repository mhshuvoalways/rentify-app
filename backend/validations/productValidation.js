const productValidation = (value) => {
  const error = {};
  if (!value.category) {
    error.category = "Please provide a product category";
  }
  if (!value.image || value.image === "null") {
    error.image = "Please provide a product image";
  }
  if (!value.title) {
    error.title = "Please provide product title";
  }
  if (!value.description) {
    error.description = "Please provide product description";
  }
  if (!value.price) {
    error.price = "Please provide product price";
  }
  let isValid = Object.keys(error).length === 0;
  return {
    error,
    isValid,
  };
};

module.exports = productValidation;
