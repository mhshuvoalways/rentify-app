import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "@/store/actions/orderAction";
import { useEffect, useState } from "react";
import Items from "./Items";
import CustomerDetails from "./CustomerDetails";

const Index = ({ orderId }) => {
  const [findOrders, setFindOrders] = useState({});
  const dispatch = useDispatch();
  const orderReducer = useSelector((store) => store.orderReducer);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  useEffect(() => {
    const findOrder = orderReducer.orders.find(
      (order) => order._id === orderId
    );
    setFindOrders(findOrder);
  }, [orderReducer, orderId]);

  return (
    <div className="flex justify-between gap-10 sm:flex-nowrap flex-wrap">
      <Items findOrders={findOrders} />
      <CustomerDetails findOrders={findOrders} />
    </div>
  );
};

export default Index;
