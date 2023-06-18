const Categories = ({ products, deleteProduct, toggleModalHandler }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white mt-5">
        <thead>
          <tr>
            <th className="text-left border border-gray-300 p-2">ID</th>
            <th className="text-left border border-gray-300 p-2">Title</th>
            <th className="text-left border border-gray-300 p-2">Type</th>
            <th className="text-left border border-gray-300 p-2">
              Availability
            </th>
            <th className="text-left border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {[...products].reverse().map((el) => (
            <tr key={el._id}>
              <td className="text-left border border-gray-300 p-2">
                #{el._id.substr(-3)}
              </td>
              <td className="text-left border border-gray-300 p-2">
                {el.title}
              </td>
              <td className="text-left border border-gray-300 p-2">
                {el.type}
              </td>
              <td className="text-left border border-gray-300 p-2">
                {el.availability}
              </td>
              <td className="text-left border border-gray-300">
                <i
                  className="fa-regular fa-trash-can  cursor-pointer p-2"
                  onClick={() => deleteProduct(el._id)}
                ></i>
                <i
                  className="fa-regular fa-pen-to-square  cursor-pointer p-2"
                  onClick={() => {
                    toggleModalHandler(el._id);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
