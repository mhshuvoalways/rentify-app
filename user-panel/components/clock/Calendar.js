import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { nanoid } from "nanoid";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useSelector } from "react-redux";

const Calendar = ({ productid, stock, selectedDates, setSelectedDates, setSelectedDate, selectedDate }) => {
  const [disabledDates, setDisableDates] = useState([]);

  const orders = useSelector((store) => store.orderReducer.orders);

  useEffect(() => {
    const temp = [...disabledDates];
    const result = [];
    for (const order of orders) {
      for (const product of order.products) {
        if (product._id === productid) {
          for (const date of product.dates) {
            if (!result.includes(date)) {
              result.push(date);
            }
          }
        }
      }
    }
    const dateCounts = {};
    for (const order of orders) {
      for (const product of order.products) {
        if (product._id === productid) {
          for (const date of product.dates) {
            if (result.includes(date)) {
              dateCounts[date] = (dateCounts[date] || 0) + product.quantity;
            }
          }
        }
      }
    }
    for (const date of result) {
      if (dateCounts[date] && dateCounts[date] >= stock) {
        temp.push(date);
      }
    }
    setDisableDates(temp);
  }, [orders]);

  const renderDayContents = (day, date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const isDisabled = disabledDates.includes(formattedDate);
    return (
      <div
        className={
          isDisabled && "bg-red-600 rounded cursor-not-allowed text-white"
        }
      >
        {day}
      </div>
    );
  };

  const handleDateChange = (date) => {
    if (disabledDates.includes(moment(date).format("YYYY-MM-DD"))) {
      return;
    }
    setSelectedDate(date);
    let totalQuantity = 0;
    let hasMatchingProduct = false;
    for (const order of orders) {
      for (const product of order.products) {
        if (
          product._id === productid &&
          product.dates.includes(moment(date).format("YYYY-MM-DD"))
        ) {
          totalQuantity += product.quantity;
          hasMatchingProduct = true;
        } else {
          hasMatchingProduct = false;
        }
      }
    }

    const finalItems = hasMatchingProduct ? stock - totalQuantity : stock;

    const obj = {
      id: nanoid(),
      date: date,
      productid: productid,
      totalQuantity: finalItems,
    };
    const temp = [...selectedDates, obj];
    setSelectedDates(temp);
  };

  const filterPastDates = (date) => {
    return moment(date).isSameOrAfter(moment().startOf("day"));
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      renderDayContents={renderDayContents}
      dateFormat={"yyyy-MM-dd"}
      className="outline-0"
      filterDate={filterPastDates}
      placeholderText="Select Date"
    />
  );
};

export default Calendar;
