import { useState, useEffect } from "react";

const useClock = (category) => {
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    const checkTime = () => {
      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();

      if (
        category.toLowerCase() === "breakfast" &&
        (hours > 19 || (hours === 19 && minutes >= 0))
      ) {
        const year = currentTime.getFullYear();
        const month = String(currentTime.getMonth() + 1).padStart(2, "0");
        const day = String(currentTime.getDate()).padStart(2, "0");

        setTodayDate(`${year}-${month}-${day}`);
      } else if (
        category.toLowerCase() !== "breakfast" &&
        (hours > 22 || (hours === 22 && minutes >= 0))
      ) {
        const year = currentTime.getFullYear();
        const month = String(currentTime.getMonth() + 1).padStart(2, "0");
        const day = String(currentTime.getDate()).padStart(2, "0");

        setTodayDate(`${year}-${month}-${day}`);
      } else {
        setTodayDate("");
      }
    };

    checkTime();
    const intervalId = setInterval(checkTime, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return { todayDate };
};

export default useClock;
