import React, { useState, useEffect } from "react";

const Clock = ({ onTimeChange }) => {
  const [time, setTime] = useState("loading...");

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date();
      setTime(currentTime);
      onTimeChange(currentTime);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [onTimeChange]);

  const formatTime = (date) => {
    if (date === "loading...") {
      return date;
    }

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  };

  return <p>{formatTime(time)}</p>;
};

export default Clock;
