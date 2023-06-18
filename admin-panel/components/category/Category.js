import Image from "next/image";

const Categories = ({ toggleModalHandler, categories, deleteCategory }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white mt-5">
        <thead>
          <tr>
            <th className="text-left border border-gray-300 p-2">Icons</th>
            <th className="text-left border border-gray-300 p-2">Name</th>
            <th className="text-left border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {[...categories].reverse().map((item) => (
            <tr key={item._id}>
              <td className="text-left border border-gray-300 p-2">
                <Image
                  unoptimized
                  src={item.image.url}
                  alt="Category"
                  width={100}
                  height={100}
                />
              </td>
              <td className="text-left border border-gray-300 p-2">
                {item.name}
              </td>
              <td className="text-left border border-gray-300">
                <i
                  className="fa-regular fa-trash-can  cursor-pointer p-2"
                  onClick={() => deleteCategory(item._id)}
                ></i>
                <i
                  className="fa-regular fa-pen-to-square  cursor-pointer p-2"
                  onClick={() => {
                    toggleModalHandler(item._id);
                  }}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
