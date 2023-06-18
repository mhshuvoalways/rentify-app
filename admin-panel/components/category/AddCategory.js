import { useEffect, useState } from "react";
import Image from "next/image";

const AddCategory = ({
  addCategory,
  updateCategory,
  allcategories,
  categoryId,
  btnReducer,
}) => {
  const [categories, setCategories] = useState({
    image: null,
    name: "",
  });

  const [imageUrl, setImageUrl] = useState("");

  const changeHandler = (event) => {
    setCategories({
      ...categories,
      [event.target.name]: event.target.value,
    });
  };

  const imageChangeHandler = (event) => {
    setCategories({
      ...categories,
      image: event.target.files[0],
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (categoryId) {
      updateCategory(
        {
          name: categories.name,
          image: categories.image,
          imageUrl,
        },
        categoryId
      );
    } else {
      addCategory(categories);
    }
  };

  useEffect(() => {
    const findPrduct = allcategories.find((pro) => pro._id === categoryId);
    setCategories({
      image: null,
      name: findPrduct?.name || "",
    });
    setImageUrl(findPrduct?.image.url || null);
  }, [allcategories, categoryId]);

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
    } else if (categories.image) {
      return (
        <div className="flex gap-2 justify-between w-56">
          <Image
            alt="not found"
            src={URL.createObjectURL(categories.image)}
            width={200}
            height={200}
          />
          <p
            className="text-xl font-semibold cursor-pointer"
            onClick={() => setCategories({ ...categories, image: null })}
          >
            ✕
          </p>
        </div>
      );
    } else {
      return (
        <label>
          <input type="file" className="hidden" onChange={imageChangeHandler} />
          <p className="rounded shadow-sm cursor-pointer border p-11">
            Choose your file
          </p>
        </label>
      );
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="flex gap-2 justify-between flex-wrap">{imageView()}</div>
      <div className="mt-5">
        <input
          type="text"
          className="p-2 outline-0 rounded w-full bg-gray-100"
          placeholder="Name"
          name="name"
          onChange={changeHandler}
          value={categories.name}
        />
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

export default AddCategory;
