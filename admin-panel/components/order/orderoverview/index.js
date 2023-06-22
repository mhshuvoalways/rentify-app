import React, { useState } from "react";
import Orders from "./Orders";
import Calendar from "@/components/Calendar";
import StatusFilter from "@/components/order/orderoverview/StatusFilter";
import modalAction from "@/store/actions/modalAction";
import { useDispatch, useSelector } from "react-redux";
import ChangeOrder from "./ChangeOrder";
import Modal from "@/components/Model";
import { updateOrder } from "@/store/actions/orderAction";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [status, setStatus] = useState("All");

  const modalReducer = useSelector((store) => store.modalReducer);
  const btnReducer = useSelector((store) => store.btnReducer);
  const orderReducer = useSelector((store) => store.orderReducer);

  const dispatch = useDispatch();

  const toggleModalHandler = (id) => {
    dispatch(modalAction(id));
  };

  const updateProduct = (product, productId) => {
    dispatch(updateOrder(productId, product));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const onStatusHandler = (event) => {
    const value = event.target.value;
    setStatus(value);
  };

  return (
    <div>
      <div className="flex gap-5 justify-between items-center">
        <Calendar
          handleDateChange={handleDateChange}
          selectedDate={selectedDate}
        />
        <StatusFilter onStatusHandler={onStatusHandler} />
      </div>
      <Orders
        toggleModalHandler={toggleModalHandler}
        selectedDate={selectedDate}
        status={status}
      />
      {modalReducer.toggle && (
        <Modal toggleModalHandler={toggleModalHandler} title="Change Status">
          <ChangeOrder
            allproducts={orderReducer.orders}
            productId={modalReducer.id}
            updateProduct={updateProduct}
            btnReducer={btnReducer}
          />
        </Modal>
      )}
    </div>
  );
};

export default Index;
