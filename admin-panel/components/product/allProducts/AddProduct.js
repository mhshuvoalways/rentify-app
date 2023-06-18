import { useEffect, useState } from "react";
import Image from "next/image";

const AddProduct = ({
  addProduct,
  updateProduct,
  allproducts,
  productId,
  btnReducer,
  categories,
}) => {
  const [products, setProducts] = useState({
    image: null,
    title: "",
    description: "",
    price: "",
    category: "",
  });

  const [imageUrl, setImageUrl] = useState("");

  const changeHandler = (event) => {
    setProducts({
      ...products,
      [event.target.name]: event.target.value,
    });
  };

  const imageChangeHandler = (event) => {
    setProducts({
      ...products,
      image: event.target.files[0],
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (productId) {
      updateProduct(
        {
          image: products.image,
          imageUrl,
          title: products.title,
          description: products.description,
          price: products.price,
          category: products.category,
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
      image: null,
      title: findPrduct?.title || "",
      description: findPrduct?.description || "",
      price: findPrduct?.price || "",
      category: findPrduct?.category || "",
    });
    setImageUrl(findPrduct?.image.url || null);
  }, [allproducts, productId]);

  const imageView = () => {
    if (imageUrl) {
      return (
        <div className="flex gap-2 justify-between w-56">
          <Image
            unoptimized
            alt="not found"
            src={imageUrl}
            width={200}
            height={200}
          />
          <p
            className="text-xl font-semibold cursor-pointer"
            onClick={() => setImageUrl(null)}
          >
            ✕
          </p>
        </div>
      );
    } else if (products.image) {
      return (
        <div className="flex gap-2 justify-between w-56">
          <Image
            alt="not found"
            src={URL.createObjectURL(products.image)}
            width={200}
            height={200}
          />
          <p
            className="text-xl font-semibold cursor-pointer"
            onClick={() => setProducts({ ...products, image: null })}
          >
            ✕
          </p>
        </div>
      );
    } else {
      return (
        <label>
          <input
            type="file"
            className="hidden"
            onChange={imageChangeHandler}
            required
          />
          <p className="rounded shadow-sm cursor-pointer border p-11">
            Choose your file
          </p>
        </label>
      );
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="flex gap-2 justify-between flex-wrap">
        {imageView()}
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
      </div>
      <div className="mt-5">
        <textarea
          className="p-2 outline-0 rounded w-full bg-gray-100 h-20"
          placeholder="Description"
          name="description"
          onChange={changeHandler}
          value={products.description}
          required
        />
      </div>
      <div className="mt-5">
        <input
          type="number"
          className="p-2 outline-0 rounded w-full bg-gray-100"
          placeholder="Price"
          name="price"
          onChange={changeHandler}
          value={products.price}
          required
        />
      </div>
      <div className="mt-5">
        <select
          className="p-2 outline-0 rounded w-full bg-gray-100"
          name="category"
          onChange={changeHandler}
          value={products.category}
          required
        >
          <option>Category</option>
          {categories.map((cat) => (
            <option key={cat._id}>{cat.name}</option>
          ))}
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
