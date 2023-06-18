import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Items from "./Items";
import CustomerDetails from "./CustomerDetails";
import { getOrders } from "@/store/actions/orderAction";

const Index = () => {
  const [myOrders, setMyOrders] = useState([]);

  const dispatch = useDispatch();
  const orderReducer = useSelector((store) => store.orderReducer);
  const userReducer = useSelector((store) => store.userReducer);

  useEffect(() => {
    const findOrder = orderReducer.orders.filter(
      (order) => order.user._id === userReducer.user._id
    );
    setMyOrders(findOrder);
  }, [orderReducer, userReducer]);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <div className="w-10/12 m-auto my-32 flex justify-between gap-10 sm:flex-nowrap flex-wrap">
      <Items myOrders={myOrders} />
      <CustomerDetails
        user={userReducer.user}
        lastAddress={myOrders[myOrders.length - 1]}
      />
    </div>
  );
};

export default Index;
