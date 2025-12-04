import React, { useEffect } from "react";
import Location from "../components/Loaction";
import { useSelector } from "react-redux";
import NoAdClock from "../components/NoAdClock";
const Home = () => {
  const theme = useSelector((state) => state.theme.theme);
  // const id = localStorage.getItem("userid");

  const status = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_KEY}status`, {
        method: "GET",
        credentials: "include", // SEND COOKIE TOKEN
      });
      console.log(response)

      // const data = await response.json(); // 👈 Parse the JSON response
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };
  useEffect(() => {
    setInterval(() => {}, 1000);
    status();
    console.log(process.env.Backend_Api);
  }, []);
  useEffect(() => {
    console.log(theme);
  }, [theme]);
  return (
    <div
      className={`${
        theme === "light" ? "bg-gray-900" : "bg-white"
      } h-[100vh] overflow-hidden`}
    >
      <NoAdClock />
      <Location />
    </div>
  );
};

export default Home;
