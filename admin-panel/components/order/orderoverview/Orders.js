import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, deleteOrder } from "@/store/actions/orderAction";
import { useEffect } from "react";
import moment from "moment/moment";

const Categories = ({ toggleModalHandler, selectedDate, status }) => {
  const dispatch = useDispatch();
  const orderReducer = useSelector((store) => store.orderReducer);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white mt-5">
        <thead>
          <tr>
            <th className="text-left px-3 py-6">ID</th>
            <th className="text-left px-3 py-6">Date</th>
            <th className="text-left px-3 py-6">Customer</th>
            <th className="text-left px-3 py-6">Items</th>
            <th className="text-left px-3 py-6">Total</th>
            <th className="text-left px-3 py-6">Status</th>
            <th className="text-left px-3 py-6">Method</th>
            <th className="text-left px-3 py-6">Action</th>
          </tr>
        </thead>
        <tbody>
          {orderReducer.orders.map((order) =>
            status === "All" ? (
              selectedDate ? (
                moment(selectedDate).format("YYYY-MM-DD") ===
                  moment(order.createdAt).format("YYYY-MM-DD") && (
                  <tr className="border" key={order._id}>
                    <td className="text-left">
                      <Link
                        href={`/order/${order._id}`}
                        className="px-3 py-6 hover:underline"
                      >
                        #{order._id.substr(-2)}
                      </Link>
                    </td>
                    <td className="text-left px-3 py-6">
                      {moment(order.createdAt).format("YYYY-MM-DD")}
                    </td>
                    <td className="text-left px-3 py-6">{order.user?.name}</td>
                    <td className="text-left px-3 py-6">
                      {order.products.length}
                    </td>
                    <td className="text-left px-3 py-6">${order.totalPrice}</td>
                    <td className="text-left px-3 py-6 text-blue-600">
                      {order.status}
                    </td>
                    <td className="text-left px-3 py-6">
                      {order.paymentMethod.cash}
                    </td>
                    <td className="space-x-5 text-left px-3 py-6 text-blue-600">
                      <i
                        className="fa-regular fa-trash-can cursor-pointer"
                        onClick={() => dispatch(deleteOrder(order._id))}
                      ></i>
                      <i
                        className="fa-regular fa-pen-to-square  cursor-pointer p-2"
                        onClick={() => {
                          toggleModalHandler(order._id);
                        }}
                      ></i>
                    </td>
                  </tr>
                )
              ) : (
                <tr className="border" key={order._id}>
                  <td className="text-left">
                    <Link
                      href={`/order/${order._id}`}
                      className="px-3 py-6 hover:underline"
                    >
                      #{order._id.substr(-2)}
                    </Link>
                  </td>
                  <td className="text-left px-3 py-6">
                    {moment(order.createdAt).format("YYYY-MM-DD")}
                  </td>
                  <td className="text-left px-3 py-6">{order.user?.name}</td>
                  <td className="text-left px-3 py-6">
                    {order.products.length}
                  </td>
                  <td className="text-left px-3 py-6">${order.totalPrice}</td>
                  <td className="text-left px-3 py-6 text-blue-600">
                    {order.status}
                  </td>
                  <td className="text-left px-3 py-6">
                    {order.paymentMethod.cash}
                  </td>
                  <td className="space-x-5 text-left px-3 py-6 text-blue-600">
                    <i
                      className="fa-regular fa-trash-can cursor-pointer"
                      onClick={() => dispatch(deleteOrder(order._id))}
                    ></i>
                    <i
                      className="fa-regular fa-pen-to-square  cursor-pointer p-2"
                      onClick={() => {
                        toggleModalHandler(order._id);
                      }}
                    ></i>
                  </td>
                </tr>
              )
            ) : (
              status.toLowerCase() === order.status &&
              (selectedDate ? (
                moment(selectedDate).format("YYYY-MM-DD") ===
                  moment(order.createdAt).format("YYYY-MM-DD") && (
                  <tr className="border" key={order._id}>
                    <td className="text-left">
                      <Link
                        href={`/order/${order._id}`}
                        className="px-3 py-6 hover:underline"
                      >
                        #{order._id.substr(-2)}
                      </Link>
                    </td>
                    <td className="text-left px-3 py-6">
                      {moment(order.createdAt).format("YYYY-MM-DD")}
                    </td>
                    <td className="text-left px-3 py-6">{order.user?.name}</td>
                    <td className="text-left px-3 py-6">
                      {order.products.length}
                    </td>
                    <td className="text-left px-3 py-6">${order.totalPrice}</td>
                    <td className="text-left px-3 py-6 text-blue-600">
                      {order.status}
                    </td>
                    <td className="text-left px-3 py-6">
                      {order.paymentMethod.cash}
                    </td>
                    <td className="space-x-5 text-left px-3 py-6 text-blue-600">
                      <i
                        className="fa-regular fa-trash-can cursor-pointer"
                        onClick={() => dispatch(deleteOrder(order._id))}
                      ></i>
                      <i
                        className="fa-regular fa-pen-to-square  cursor-pointer p-2"
                        onClick={() => {
                          toggleModalHandler(order._id);
                        }}
                      ></i>
                    </td>
                  </tr>
                )
              ) : (
                <tr className="border" key={order._id}>
                  <td className="text-left">
                    <Link
                      href={`/order/${order._id}`}
                      className="px-3 py-6 hover:underline"
                    >
                      #{order._id.substr(-2)}
                    </Link>
                  </td>
                  <td className="text-left px-3 py-6">
                    {moment(order.createdAt).format("YYYY-MM-DD")}
                  </td>
                  <td className="text-left px-3 py-6">{order.user?.name}</td>
                  <td className="text-left px-3 py-6">
                    {order.products.length}
                  </td>
                  <td className="text-left px-3 py-6">${order.totalPrice}</td>
                  <td className="text-left px-3 py-6 text-blue-600">
                    {order.status}
                  </td>
                  <td className="text-left px-3 py-6">
                    {order.paymentMethod.cash}
                  </td>
                  <td className="space-x-5 text-left px-3 py-6 text-blue-600">
                    <i
                      className="fa-regular fa-trash-can cursor-pointer"
                      onClick={() => dispatch(deleteOrder(order._id))}
                    ></i>
                    <i
                      className="fa-regular fa-pen-to-square  cursor-pointer p-2"
                      onClick={() => {
                        toggleModalHandler(order._id);
                      }}
                    ></i>
                  </td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
