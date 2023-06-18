import Image from "next/image";
import Link from "next/link";

const Categories = ({ products, deleteProduct, toggleModalHandler }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white mt-5">
        <thead>
          <tr>
            <th className="text-left border border-gray-300 p-2">Image</th>
            <th className="text-left border border-gray-300 p-2">Title</th>
            <th className="text-left border border-gray-300 p-2">
              Desctiption
            </th>
            <th className="text-left border border-gray-300 p-2">Price</th>
            <th className="text-left border border-gray-300 p-2">Stock</th>
            <th className="text-left border border-gray-300 p-2">Category</th>
            <th className="text-left border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {[...products].reverse().map((el) => (
            <tr key={el._id}>
              <td className="text-left border border-gray-300 p-2">
                <Image
                  unoptimized
                  src={el.image?.url}
                  alt="Product"
                  width={150}
                  height={150}
                />
              </td>
              <td className="text-left border border-gray-300 p-2">
                {el.title}
              </td>
              <td className="text-left border border-gray-300 p-2">
                {el.description}
              </td>
              <td className="text-left border border-gray-300 p-2">
                ${el.price}
              </td>
              <td className="text-left border border-gray-300 p-2 text-green-600">
                {el.subProducts?.length}
              </td>
              <td className="text-left border border-gray-300 p-2">
                {el.category}
              </td>
              <td className="border border-gray-300 px-2">
                <div className="flex justify-around items-center">
                  <i
                    className="fa-regular fa-trash-can cursor-pointer"
                    onClick={() => deleteProduct(el._id)}
                  ></i>
                  <i
                    className="fa-regular fa-pen-to-square  cursor-pointer p-2"
                    onClick={() => {
                      toggleModalHandler(el._id);
                    }}
                  ></i>
                  <Link href={`/product/${el._id}`}>
                    <i className="fa-solid fa-circle-info cursor-pointer"></i>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
