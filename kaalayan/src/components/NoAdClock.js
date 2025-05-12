import React, { useState, useEffect } from "react";
import "../css/Clock3.css"; // Assuming this file exists for styling
import clockImage from "../assets/images/clock.png"; // Update the path accordingly
import planetRing from "../assets/images/planetring.png";
import klogo from '../assets/images/klogo.jpeg'
import qrcode from "../assets/images/qrcode.svg";
import innerClockImage from "../assets/images/D1.png"; // Update the path accordingly
import axios, { getAdapter } from "axios";
import taaskata from "../assets/images/taskata24.png";
import minkata from "../assets/images/minkata.png";
import spotImage from "../assets/images/spot.png";
import datefunction from "../components/dategiver.js";
import converttime from "../components/timeconverter.js";
import Modal from "./Modal.js";
import adver from "../assets/images/vicco.jpg";
import VerticalProgressBar from "./Progrressbar.js";
import dialpositioner from "./dialposition.js";
import { useSelector } from "react-redux";
import EarthRotation from "../planets/EarthRotation.js";
import JupiterRotation from "../planets/JupiterRotation.js";
import KetuRotation from "../planets/KetuRotation.js";
import MarsRotation from "../planets/MarsRotation.js";
import RahuRotation from "../planets/RahuRotation.js";
import MoonRotation from "../planets/MoonRotation.js";
import NeptuneRotation from "../planets/NeptuneRotation.js";
import UranusRotation from "../planets/UranusRotation.js";
import VenusRotation from "../planets/VenusRotation.js";
import SunRotation from "../planets/SunRotation.js";
//import vedicdatefunction from '../components/dategiver.js';
//import vedicdatefunction from '../components/dategiver.js';

const NoAdClock = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notify, stenotify] = useState();
  const [data, setadata] = useState([]);
  const [time, setTime] = useState(new Date());
  const [todaysData, setTodaysData] = useState({});
  const [text, settext] = useState("");
  const theme = useSelector((state) => state.theme.theme);
  //hooks for advertise
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adverror, advsetError] = useState(null);

  //logic for advertise
  const apiKey = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    const updateLanguage = () => {
      const lang = localStorage.getItem("Language");
      if (lang === "Hindi") {
        settext("Kalayaan");
      } else if (lang === "Marathi") {
        settext("कालायन");
      } else {
        settext("कालायन");
      }
      console.log(lang);
    };

    updateLanguage(); // Run on mount

    const interval = setInterval(updateLanguage, 1000); // Check every second

    return () => clearInterval(interval); // Cleanup
  }, []);

  const getdata = async () => {
    try {
      const response = await fetch(apiKey + "get_data");
      const result = await response.json();
      setadata(result);
    } catch (error) {
      console.log(error);
    }
  };

  const Notification = async () => {
    try {
      const response = await fetch(apiKey + "Get_notification");
      const result = await response.json();
      stenotify(result[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getdata();
    Notification();
    console.log(notify);
  }, []);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await axios.get(apiKey + "advertise"); // change port to 4000
        setAdvertisements(response.data.data);
      } catch (err) {
        advsetError(
          err.response
            ? err.response.data.message
            : "Error fetching advertisements"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAdvertisements();
  }, []);

  // hooks for notification
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  // logic for notification change

  useEffect(() => {
    console.log(data);
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 200); // Update time every second

    return () => clearInterval(timerId); // Cleanup the interval on component unmount
  }, []);

  const fetchNotification = async () => {
    try {
      const response = await fetch(
        apiKey + "Get_notification/" + sessionStorage.getItem("userid")
      );
      const data = await response.json();
      if (data.length > 0) {
        console.log(data[0].Marathi_text);
        setNotifications(data); // Display the most recent notification's info
      } else {
        setNotifications("No notifications available");
      }
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    // Function to fetch data from the A
    fetchNotification();
  }, []);
  //this hook is used to show the info related to current date
  useEffect(() => {
    const updateTodaysData = () => {
      const now = new Date();
      const todayString = now.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const todayData =
        data.find((item) => item.gregorianDate === todayString) || {};
      setTodaysData(todayData);
    };

    updateTodaysData(); // Call the function to get today's data

    const dateChangeInterval = setInterval(updateTodaysData, 60 * 1000); // Update every minute

    return () => clearInterval(dateChangeInterval);
  }, []);

  function isOdd(num) {
    return num % 2;
  }
  const now = new Date();
  // Extract the hours, minutes, and seconds
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  //diff = 1611 seconds
  const now_loc = new Date(now - 1611000);
  const hours_loc = now_loc.getHours();
  const minutes_loc = now_loc.getMinutes();
  const seconds_loc = now_loc.getSeconds();

  const decisec = Math.round(
    (now.getSeconds() * 10 + now.getMilliseconds() / 100) / 4
  );
  let vipals = decisec % 60;
  const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
  const currentTimeInMinutes = totalMinutes;
  const minutesSince6AM = currentTimeInMinutes - 6 * 60; // Calculate time passed since 6:00 AM

  let adjustedMinutes;
  if (minutesSince6AM < 0) {
    // If the time is before 6:00 AM, consider it part of the previous day's Vedic time
    adjustedMinutes = minutesSince6AM + 24 * 60; // Add 24 hours (1440 minutes)
  } else {
    adjustedMinutes = minutesSince6AM;
  }
  //const  = adjustedMinutes / 24; // 1 ghatika = 24 minutes
  const ghatika = Math.floor(adjustedMinutes / 24); // 1 ghatika = 24 minutes

  let ghatikapart = adjustedMinutes % 24;
  if (isOdd(hours)) {
    ghatikapart = (adjustedMinutes + 60) % 24;
  } else {
    ghatikapart = adjustedMinutes % 24;
  }
  let pal_basic = Math.floor(ghatikapart / 2) * 5;
  // pal_basic = ghatikapart*2.5
  //const ghatikaPart = Math.floor(ghatika); // Whole ghatikas
  //const pal =  (ghatika - ghatikaPart) * 60; // Remaining part in pal (60 pal = 1 ghatika)
  const pal_in_two_min = Math.floor(
    (parseInt(seconds) + 60 * isOdd(minutes)) / 24
  );
  const pal = pal_basic + pal_in_two_min;

  if (isOdd(minutes)) {
    vipals = (decisec + 31) % 60;
  } else {
    vipals = decisec % 60;
  }
  const ghatikaCount = ghatika;
  let palCount = pal; //Math.floor((totalSeconds % 1440) / 24); // 1 Pal = 24 seconds (0.4 minutes)
  let vipalCount = vipals; // 1 Vipal = 0.4 seconds

  // converttime(1)[0]
  const ghatika_loc = converttime(1)[0]; //ghatika;
  let pal_loc = converttime(1)[1]; //pal;
  let vipal_loc = converttime(1)[2]; //vipals;

  // Rotation calculations for dials
  const ghatikaRotation = (ghatikaCount % 60) * (360 / 60) - 90; // 30 Ghatikas in 12 hours
  const palRotation = (palCount % 60) * (360 / 60) + 90; // 60 Pals in 1 Ghatika
  let vipalRotation = vipalCount * (360 / 60) - 90; // 60 Vipals in 1 Pal
  // if (vipalRotation>320) {vipalRotation=0;}

  let date = time.getDate();
  if (hours < 6) {
    date = date - 1;
  } //ensure datechanged only at 6 am
  let indianDate = datefunction(date)[0]; //"  25 Ashwin 1946"
  let vedicDate = datefunction(date)[1]; //"25 Isha Maas 5126"

  let originX = -30; // + 20*Math.sin(seconds*6);
  let originY = -25; //Math.sin(seconds*6);
  //var Rangle = Number(ghatikaCount) + 30;
  let Rangle = Number(ghatikaCount);
  let Ring_rotation = Rangle * 6;

  [Ring_rotation, originX, originY] = dialpositioner(Rangle);

  Ring_rotation = Ring_rotation - 111;
  let thekaran = "विष्टी";
  let theyog = "he";
  let thenaxatra = "he";

  const gregdate = new Date().toDateString(); // This will return something like "Sun Nov 04 2024"
  const commaSeparatedDate = gregdate.split(" ").join(", "); // Splitting by spaces and joining with ', '

  const Openmodal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="container-fluid main ">
        <nav className="w-full ">
          <button
            className={`${
              theme == "light" ? "bg-gray-200" : "bg-gray-800"
            } absolute right-0`}
            onClick={Openmodal}
          >
            <i
              class={`${
                theme == "dark" ? "text-gray-200" : "text-gray-800"
              } bi bi-list text-4xl`}
            ></i>
          </button>
        </nav>
        <Modal open={isOpen} close={setIsOpen} />
      <br />
<br /><br /><br />
       
<div className="container-fluid mb-2 mt-[-80px]">
  <div className="grid grid-cols-3 items-center">
    
    {/* Left Column: Ayan */}
    <div className="text-left font-bold text-2xl ">

    </div>

    {/* Center Column: Image or Text */}
    <div className="flex justify-center items-center">
      <img src={klogo} alt="Kalayan" className="w-30 h-[60px]" />
      {/* Or use text instead of image: */}
      {/* <h3 className="text-danger text-4xl font-bold">|| कालायन ||</h3> */}
    </div>

    {/* Right Column: Rutu */}
    <div className="text-right font-bold text-2xl ">

    </div>
    
  </div>
</div>

<div style={{position:"absolute",top:"100px" ,left:"5px"}} className={`${theme == "light" ? "text-gray-100" : "text-gray-700"} font-bold`}>
अयन : {data.length > 0 ? data[0].Ayan : ""}

</div>

<div style={{position:"absolute", top:"100px" ,right:"3%"}}  className={`${theme == "light" ? "text-gray-100" : "text-gray-700"} font-bold`}>
ऋतु :  {data.length > 0 ? data[0].Rutu : ""}
</div>
<br /><br />

        {/* clock dial */}
        <div className="container-fluid clock-container mt-[-30px]">
          {/* Kalayan Clock Wrapper */}
          <div className="clock">
            {/* Rotating Background Images */}
            <div
              className="clock-background"
              style={{
                transform: `translate(-50%, -50%) rotate(${Ring_rotation}deg)`,
              }}
            >
              <img
                src={clockImage}
                alt="Kalayan Clock Background"
                className="clock-background"
              />
              <img
                src={planetRing}
                alt="Planet Ring"
                className="clock-background"
              />
            </div>

            {/* Inner Circle Image */}
            <img
              src={
                localStorage.getItem("bg")
                  ? localStorage.getItem("bg")
                  : innerClockImage
              }
              alt="Inner Circle"
              className="inner-clock-background"
            />

            {/* Vipal Dial */}
            <div
              className="dial vipal"
              style={{
                transform: `translate(-42%, -100%) rotate(${vipalRotation}deg)`,
              }}
            ></div>

            {/* Pal Dial */}
            <div className="dial">
              <div
                className="minkata"
                style={{
                  transform: `translate(-20%, -140%) rotate(${palRotation}deg)`,
                }}
              >
                <img src={minkata} alt="Pal Hand" />
              </div>
            </div>

            {/* Ghatika Dial */}
            <div className="dial">
              <div
                className="taskata"
                style={{
                  transform: `translate(-50%, 0%) rotate(${
                    ghatikaRotation + 180
                  }deg)`,
                }}
              >
                <img src={taaskata} alt="Ghatika Hand" />
              </div>
            </div>
          </div>
        </div>

        <br />
        <br />
        <br />

        {/* Ayan Section */}
        <section className="absolute top-[-19%] left-[2%]">
          <VerticalProgressBar />
        </section>

        <div className="container-fluid mb-2 mt-[-80px]">
          <div className="grid grid-cols-2 gap-4">
            <div className={`font-bold text-2xl ${theme== "light" ? "text-gray-100" : "text-gray-700"}`}>सूर्योदय:-{data[0]?.Suryoday &&  data[0]?.Suryoday }</div>
            <div className={`flex justify-end font-bold text-2xl  ${theme== "light" ? "text-gray-100" : "text-gray-700"}`}>
              सूर्यास्त:-{data[0]?.Suryasta &&   data[0]?.Suryasta}
            </div>
          </div>
        </div>
        <EarthRotation/>
        <JupiterRotation/>
        <KetuRotation/>
        <MarsRotation/>
        <MoonRotation/>
        <RahuRotation/>
        <NeptuneRotation/>
        <SunRotation/>
        <UranusRotation/>
        <VenusRotation/>
        {/* Time Tables Section */}

        {/* First Table Section */}
        <div className="d-flex vedind gap-1 justify-content-between w-full h-[177px]">
          <table className="table">
            <thead className="custom-header">
              <tr>
                <th></th>
                <th>Ghati</th>
                <th>Pal</th>
                <th>Vipal</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-bottom border-dark">
                <td  style={{fontSize:"1.8rem" }}>Std</td>
                <td>{ghatikaCount < 10 ? "0" + ghatikaCount : ghatikaCount}</td>
                <td>{palCount < 10 ? "0" + palCount : palCount}</td>
                <td>{vipalCount < 10 ? "0" + vipalCount : vipalCount}</td>
              </tr>

              <tr className="text-dark">
                <td>Loc</td>
                <td>{ghatika_loc < 10 ? "0" + ghatika_loc : ghatika_loc}</td>
                <td>{pal_loc < 10 ? "0" + pal_loc : pal_loc}</td>
                <td>{vipal_loc < 10 ? "0" + vipal_loc : vipal_loc}</td>
              </tr>
            </tbody>
          </table>

       
          <table className="table">
            <thead className="custom-header">
              <tr>
                <th></th>
                <th>HH</th>
                <th>MM</th>
                <th>SS</th>
              </tr>
            </thead>
            <tbody>
              <tr className="stdrow">
                <td style={{ backgroundColor: "#FFF3B0" ,fontSize:"1.8rem" }}>Std</td>
                <td style={{ backgroundColor: "#FFF3B0",fontSize:"1.8rem" }}>
                  {hours < 10 ? "0" + hours : hours}
                </td>
                <td style={{ backgroundColor: "#FFF3B0",fontSize:"1.8rem" }}>
                  {minutes < 10 ? "0" + minutes : minutes}
                </td>
                <td style={{ backgroundColor: "#FFF3B0",fontSize:"1.8rem" }}>
                  {seconds < 10 ? "0" + seconds : seconds}
                </td>
              </tr>
              <tr className="text-dark">
                <td>Loc</td>
                <td>{hours_loc < 10 ? "0" + hours_loc : hours_loc}</td>
                <td>{minutes_loc < 10 ? "0" + minutes_loc : minutes_loc}</td>
                <td>{seconds_loc < 10 ? "0" + seconds_loc : seconds_loc}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Tithi Table */}
        <table className="table tithitable bg-[light-purple] text-white shadow-lg rounded-lg mt-[-13px]">
          <tbody widrh>
            <tr className="custom-border">
              <td className="tithitd py-3">
                <strong className="!text-[1.2rem]">पूर्णिमांत तिथी:</strong>
                <span className="tithivalue !text-[1.2rem]">
                  {data.length > 0 ? data[0].Purnimant_tithi : ""}
                </span>
              </td>
              <td className="tithitd py-3">
                <strong className="!text-[1.2rem]">आमांत तिथी:</strong>
                <span className="tithivalue !text-[1.2rem]">
                  {data.length > 0 ? data[0].Amant_tithi : ""}
                </span>
              </td>
              <td className="tithitd py-3">
                <strong className="!text-[1.2rem]">नक्षत्र:</strong>
                <span className="tithivalue !text-[1.2rem]">
                  {data.length > 0 ? data[0].Nakshatra : ""}
                </span>
              </td>
            </tr>
            <tr className="custom-border">
              <td className="tithitd py-3">
                <strong className="!text-[1.2rem]">दिनकरण:</strong>
                <span className="tithivalue !text-[1.2rem]">
                  {data.length > 0 ? data[0].DivaKaran : ""}
                </span>
              </td>
              <td className="tithitd py-3">
                <strong className="!text-[1.2rem]">रात्रीकरण:</strong>
                <span className="tithivalue !text-[1.2rem]">
                  {data.length > 0 ? data[0].RatriKaran : ""}
                </span>
              </td>
              <td className="tithitd py-3">
                <strong className="!text-[1.2rem]">योग:</strong>
                <span className="tithivalue !text-[1.2rem]">
                  {data.length > 0 ? data[0].Yog : ""}
                </span>
              </td>
            </tr>
            <tr className="custom-border w-full ">
              <td className="py-3 tithivalue text-left !text-[1.3rem]">दिनविशेष:</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>

        {/* ind ved greg time section  */}

        <div className="d-flex justify-content-between qrindved w-full  mt-[-14px]">
          <table className="table indvedgreg table-bordered table-striped table-hover max-h-[80px] m-auto">
            <tbody>
              <tr style={{ Height: "30px" }}>
                <th className="!text-[1.2rem]">Vikram Samvat Date</th>
                <td>{commaSeparatedDate}</td>
              </tr>
              <tr style={{ Height: "30px" }}>
                <th className="!text-[1.2rem]">Indian Date</th>
                <td>{data.length > 0 ? data[0].Indian_date : ""}</td>
              </tr>
              <tr style={{ Height: "30px" }}>
                <th className="!text-[1.2rem]">Vedic Date</th>
                <td>{data.length > 0 ? data[0].Vedic_date : ""}</td>
              </tr>
              <tr style={{ Height: "30px" }}>
                <th className="!text-[1.2rem]">Greg. Date</th>
                <td>{commaSeparatedDate}</td>
              </tr>
            </tbody>
          </table>

          <div
            className={`bg-white h-[190px] m-auto`}
          >
            <img
              src={qrcode}
              alt="Kalayan Clock"
              className="object-cover h-full w-full"
            />
          </div>
        </div>

        {/* Notification */}
        <div className="container-fluid notification  border border-success  bg-success mt-2">
          {error && <p style={{ color: "red" }}>Error: {error}</p>}
          <p className="text-white w-full text-center">
            {notifications?.[0]?.Marathi_text}
          </p>
        </div>

        {/* <div className='container-fluid adv mt-1 border border-dark w-full'> */}
        {/* <img src={adver} alt='error' className='object-cover w-full' /> */}
        {/* {advertisements.map((ad) => (
             <div key={ad.id} className="advertisement-item">
               <h3>Happy Holi</h3>
               <img
                 src={`http://192.168.0.119:4000/uploads/${ad.adv_file}`} // Adjust the path based on your setup
                 alt={ad.info}
                 style={{ width: '200px', height: '200px' }} // You can adjust the styles as needed
               />
               <p>Created At: {new Date(ad.created_at).toLocaleString()}</p>
             </div>
           ))} */}
        {/* </div> */}
      </div>
    </>
  );
};
// C:\Users\Acer\Downloads\kalayan28\backend\uploads\mediaFile-1730725252308.jpeg
export default NoAdClock;
