import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "@/store/actions/orderAction";
import { useEffect } from "react";
import moment from "moment/moment";

const Categories = () => {
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
          </tr>
        </thead>
        <tbody>
          {orderReducer.orders.map((order) => (
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
                {moment(order.createdAt).format("LL")}
              </td>
              <td className="text-left px-3 py-6">{order.user?.name}</td>
              <td className="text-left px-3 py-6">{order.products.length}</td>
              <td className="text-left px-3 py-6">${order.totalPrice}</td>
              <td className="text-left px-3 py-6 text-blue-600">
                {order.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
