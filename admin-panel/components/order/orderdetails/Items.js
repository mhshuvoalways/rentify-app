const OrderDetails = ({ findOrders }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full bg-white">
        <thead>
          <tr>
            <th className="text-left px-3 py-6">Product Name</th>
            <th className="text-left px-3 py-6">Items</th>
            <th className="text-left px-3 py-6">Price</th>
            <th className="text-left px-3 py-6">Dates</th>
          </tr>
        </thead>
        <tbody>
          {findOrders?.products?.map((product) => (
            <tr className="border" key={product._id}>
              <td className="text-left px-3 py-6">{product.title}</td>
              <td className="text-left px-3 py-6">{product.quantity}</td>
              <td className="text-left px-3 py-6">${product.price}</td>
              <td className="text-left px-3 py-6 w-2/12">
                {product.dates.map(date => (
                  <p className="text-green-600">{date}</p>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetails;
