import React, { useState, createContext } from "react";

export const MyContext = createContext(null);

const Context = ({ children }) => {
  const [selectedDates, setSelectedDates] = useState([]);

  return (
    <MyContext.Provider
      value={{
        setSelectedDates: setSelectedDates,
        selectedDates: selectedDates,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default Context;
