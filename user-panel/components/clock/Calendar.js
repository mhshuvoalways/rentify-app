import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { nanoid } from "nanoid";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useSelector } from "react-redux";
import useClock from "./useClock";

const Calendar = ({
  productid,
  stock,
  selectedDates,
  setSelectedDates,
  setSelectedDate,
  selectedDate,
  category
}) => {
  const [disabledDates, setDisableDates] = useState([]);
  const [lowStock, setLowStock] = useState([]);

  const { todayDate } = useClock(category);

  const orders = useSelector((store) => store.orderReducer.orders);

  useEffect(() => {
    const temp = [...disabledDates];
    const tempLow = [...lowStock];

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
      if (dateCounts[date] && dateCounts[date] <= 1) {
        tempLow.push(date);
      }
    }
    setDisableDates(temp);
    setLowStock(tempLow);
  }, [orders]);

  const renderDayContents = (day, date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const isDisabled = disabledDates.includes(formattedDate);
    const lowStockBlue = lowStock.includes(formattedDate);

    if (formattedDate === todayDate) {
      return <div className="bg-red-600 rounded cursor-not-allowed">{day}</div>;
    }
    if (isDisabled) {
      return <div className="bg-red-600 rounded cursor-not-allowed">{day}</div>;
    }
    if (lowStockBlue) {
      return <div className="bg-blue-700 rounded text-white">{day}</div>;
    }
    return <div>{day}</div>;
  };

  const handleDateChange = (date) => {
    if (disabledDates.includes(moment(date).format("YYYY-MM-DD"))) {
      return;
    }
    if (todayDate.includes(moment(date).format("YYYY-MM-DD"))) {
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
