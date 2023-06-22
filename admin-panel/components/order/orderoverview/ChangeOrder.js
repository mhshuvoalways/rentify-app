import { useEffect, useState } from "react";

const AddProduct = ({ updateProduct, allproducts, productId, btnReducer }) => {
  const [products, setProducts] = useState({
    category: "",
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
          status: products.status,
        },
        productId
      );
    }
  };

  useEffect(() => {
    const findPrduct = allproducts.find((pro) => pro._id === productId);
    setProducts({
      status: findPrduct?.status || "",
    });
  }, [allproducts, productId]);

  return (
    <form onSubmit={onSubmitHandler}>
      <div>
        <select
          className="p-2 outline-0 rounded w-full bg-gray-100"
          name="status"
          onChange={changeHandler}
          value={products.status}
          required
        >
          <option>pending</option>
          <option>completed</option>
        </select>
      </div>
      <div className="mt-5">
        {btnReducer ? (
          <button className="text-xl p-2 text-white outline-0 rounded w-full bg-blue-600">
            Update
          </button>
        ) : (
          <button
            className="text-xl p-2 text-white outline-0 rounded w-full bg-gray-600 opacity-50 cursor-not-allowed"
            disabled
          >
            Update
          </button>
        )}
      </div>
    </form>
  );
};

export default AddProduct;
