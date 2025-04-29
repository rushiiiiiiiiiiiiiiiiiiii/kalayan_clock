import React, { useEffect } from 'react'
import Clock from '../components/Clock1'
import Location from '../components/Loaction';
import { useSelector } from 'react-redux';

const Home = () => {
  const theme = useSelector((state) => state.theme.theme)
  const id = sessionStorage.getItem("userid");

  const status = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_KEY}/status/${id}`);
      const data = await response.json();  // 👈 Parse the JSON response
      console.log(data);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };
  useEffect(() => {
    setInterval(() => {
    }, 1000);
    status()
    console.log(process.env.Backend_Api);
  }, [])
  useEffect(() => { console.log(theme) }, [theme])
  return (
    <div className={`${theme == "light" ? "bg-gray-900" : "bg-white"}`}>
      <Clock />
      <Location />
    </div>
  )
}

export default Home
