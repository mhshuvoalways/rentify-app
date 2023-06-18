import { useEffect, useState } from "react";

const AddProduct = ({
  addProduct,
  updateProduct,
  allproducts,
  productId,
  btnReducer,
}) => {
  const [products, setProducts] = useState({
    title: "",
    type: "",
    availability: "",
  });

  const changeHandler = (event) => {
    setProducts({
      ...products,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (productId) {
      updateProduct(
        {
          title: products.title,
          type: products.type,
          availability: products.availability,
        },
        productId
      );
    } else {
      addProduct(products);
    }
  };

  useEffect(() => {
    const findPrduct = allproducts.find((pro) => pro._id === productId);
    setProducts({
      title: findPrduct?.title || "",
      type: findPrduct?.type || "",
      availability: findPrduct?.availability || "",
    });
  }, [allproducts, productId]);

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="md:mt-0 mt-5">
        <input
          type="text"
          className="p-2 outline-0 rounded w-full bg-gray-100"
          placeholder="Title"
          name="title"
          onChange={changeHandler}
          value={products.title}
          required
        />
      </div>

      <div className="mt-5">
        <input
          type="text"
          className="p-2 outline-0 rounded w-full bg-gray-100"
          placeholder="Type"
          name="type"
          onChange={changeHandler}
          value={products.type}
          required
        />
      </div>
      <div className="mt-5">
        <select
          className="p-2 outline-0 rounded w-full bg-gray-100"
          name="availability"
          onChange={changeHandler}
          value={products.availability}
          required
        >
          <option>Availability</option>
          <option>Running</option>
          <option>In service</option>
          <option>Block</option>
          <option>Not Available</option>
        </select>
      </div>
      <div className="mt-5">
        {btnReducer ? (
          <button className="text-xl p-2 text-white outline-0 rounded w-full bg-blue-600">
            Add
          </button>
        ) : (
          <button
            className="text-xl p-2 text-white outline-0 rounded w-full bg-gray-600 opacity-50 cursor-not-allowed"
            disabled
          >
            Add
          </button>
        )}
      </div>
    </form>
  );
};

export default AddProduct;
