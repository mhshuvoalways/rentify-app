import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUser } from "@/store/actions/userAction";
import { getOrders } from "@/store/actions/orderAction";
import { getCategoires } from "@/store/actions/categoryAction";
import { getProducts } from "@/store/actions/productAction";
import { getAllSubProducts } from "@/store/actions/subProductAction";

const index = () => {
  const dispatch = useDispatch();

  const userReducer = useSelector((store) => store.userReducer);
  const orderReducer = useSelector((store) => store.orderReducer);
  const categoryReducer = useSelector((store) => store.categoryReducer);
  const productReducer = useSelector((store) => store.productReducer);
  const subProReducer = useSelector((store) => store.subProReducer);

  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getOrders());
    dispatch(getCategoires());
    dispatch(getProducts());
    dispatch(getAllSubProducts());
  }, [dispatch]);

  let currentOrder = 0;
  orderReducer.orders.forEach((order) => {
    if (order.status === "pending") {
      currentOrder++;
    }
  });

  return (
    <div className="flex justify-between gap-5 flex-wrap">
      <div className="flex flex-wrap justify-between gap-2 w-full sm:w-64 items-center bg-white shadow hover:shadow-md rounded-xl p-10">
        <div>
          <p className="text-xl font-semibold">
            {categoryReducer.categories.length}
          </p>
          <p className="opacity-90">Categories</p>
        </div>
        <i className="fa-solid fa-circle-info text-4xl"></i>
      </div>
      <div className="flex flex-wrap justify-between gap-2 w-full sm:w-64 items-center bg-white shadow hover:shadow-md rounded-xl p-10">
        <div>
          <p className="text-xl font-semibold">
            {productReducer.products?.length}
          </p>
          <p className="opacity-90">Products</p>
        </div>
        <i className="fa-solid fa-circle-info text-4xl"></i>
      </div>
      <div className="flex flex-wrap justify-between gap-2 w-full sm:w-64 items-center bg-white shadow hover:shadow-md rounded-xl p-10">
        <div>
          <p className="text-xl font-semibold">
            {subProReducer.allProducts.length}
          </p>
          <p className="opacity-90">Sub Products</p>
        </div>
        <i className="fa-solid fa-circle-info text-4xl"></i>
      </div>
      <div className="flex flex-wrap justify-between gap-2 w-full sm:w-64 items-center bg-white shadow hover:shadow-md rounded-xl p-10">
        <div>
          <p className="text-xl font-semibold">{orderReducer.orders.length}</p>
          <p className="opacity-90">Orders</p>
        </div>
        <i className="fa-solid fa-circle-info text-4xl"></i>
      </div>
      <div className="flex flex-wrap justify-between gap-2 w-full sm:w-64 items-center bg-white shadow hover:shadow-md rounded-xl p-10">
        <div>
          <p className="text-xl font-semibold">{currentOrder}</p>
          <p className="opacity-90">Current Orders</p>
        </div>
        <i className="fa-solid fa-circle-info text-4xl"></i>
      </div>
      <div className="flex flex-wrap justify-between gap-2 w-full sm:w-64 items-center bg-white shadow hover:shadow-md rounded-xl p-10">
        <div>
          <p className="text-xl font-semibold">{userReducer.allUser?.length}</p>
          <p className="opacity-90">Users</p>
        </div>
        <i className="fa-solid fa-circle-info text-4xl"></i>
      </div>
    </div>
  );
};

export default index;
