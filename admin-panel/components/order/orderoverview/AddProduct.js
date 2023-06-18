import Image from "next/image";
import Breakfast from "../../public/products/breakfast.jpg";

const AddProduct = () => {
  return (
    <div>
      <div className="flex gap-2 justify-between flex-wrap">
        <div className="flex gap-2 justify-between w-56">
          <Image src={Breakfast} alt="" />
          <p className="text-xl font-semibold cursor-pointer">✕</p>
        </div>
        <div>
          <input
            type="text"
            className="p-2 outline-0 rounded w-full bg-gray-100"
            placeholder="Title"
          />
        </div>
      </div>
      <div className="mt-5">
        <textarea
          className="p-2 outline-0 rounded w-full bg-gray-100 h-20"
          placeholder="Description"
        />
      </div>
      <div className="mt-5">
        <input
          type="number"
          className="p-2 outline-0 rounded w-full bg-gray-100"
          placeholder="Stock"
        />
      </div>
      <div className="mt-5">
        <input
          type="text"
          className="p-2 outline-0 rounded w-full bg-gray-100"
          placeholder="Type"
        />
      </div>
      <div className="mt-5">
        <select className="p-2 outline-0 rounded w-full bg-gray-100">
          <option>Default</option>
          <option>Bycicle</option>
          <option>Bike</option>
          <option>Breakfast</option>
        </select>
      </div>
      <div className="mt-5">
        <button className="text-xl p-2 text-white outline-0 rounded w-full bg-blue-600">
          Add
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
