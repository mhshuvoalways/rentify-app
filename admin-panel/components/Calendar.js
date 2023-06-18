import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat={"yyyy-MM-dd"}
      className="p-2 outline-0 rounded sm:w-48 w-full"
      placeholderText="Search with date..."
    />
  );
};

export default Calendar;
