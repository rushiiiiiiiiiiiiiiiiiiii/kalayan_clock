import React, { useEffect } from 'react'
import Clock from '../components/Clock1'
import Location from '../components/Loaction';

const Home = () => {
  const id = sessionStorage.getItem("userid");

const status = async () => {
  try {
    const response = await fetch(`http://192.168.0.108:5100/status/${id}`);
    const data = await response.json();  // 👈 Parse the JSON response
    console.log(data);
  } catch (err) {
    console.error("Error updating status:", err);
  }
};
  useEffect(()=>{
    setInterval(() => {
    }, 1000);
    status()
  },[])
  return (
    <div>
      <Clock/>
      <Location/>
    </div>
  )
}

export default Home
