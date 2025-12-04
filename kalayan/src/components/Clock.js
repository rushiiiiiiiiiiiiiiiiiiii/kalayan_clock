import React, { useState, useEffect } from "react";
import styles from "../css/Clock2.module.css";
import clockImage from "../assets/images/clock.png"; // Update the path accordingly
import klogo from "../assets/images/kalaayan-logo.png";
import qrcode from "../assets/images/kalayanqr.png";
import innerClockImage from "../assets/images/D1.png"; // Update the path accordingly
// import axios, { getAdapter } from "axios";
import taaskata from "../assets/images/taskata24.png";
import minkata from "../assets/images/minkata.png";
// import datefunction from "../components/dategiver.js";
import converttime from "../components/timeconverter.js";
import VerticalProgressBar from "./Progrressbar.js";
import { useSelector } from "react-redux";
// import EarthRotation from "../planets/EarthRotation.js";
import JupiterRotation from "../planets_Ad/JupiterRotation.js";
import KetuRotation from "../planets_Ad/KetuRotation.js";
import MarsRotation from "../planets_Ad/MarsRotation.js";
import RahuRotation from "../planets_Ad/RahuRotation.js";
import MoonRotation from "../planets_Ad/MoonRotation.js";
// import NeptuneRotation from "../planets_Ad/NeptuneRotation.js";
// import UranusRotation from "../planets_Ad/UranusRotation.js";
import { useCallback } from "react";
import VenusRotation from "../planets_Ad/VenusRotation.js";
import SunRotation from "../planets_Ad/SunRotation.js";
import MercuryRotation from "../planets_Ad/MercuryRotation.js";
import SaturnRotation from "../planets_Ad/SatturnRotation.js";
// import axios from "axios";
// import PlanetSelector from "./PlanetSelector.js";
//import vedicdatefunction from '../components/dategiver.js';
//import vedicdatefunction from '../components/dategiver.js';

const NoAdClock = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const [notify, setnotify] = useState();
  const [data, setdata] = useState([]);
  // const [time, setTime] = useState(new Date());
  // const [todaysData, setTodaysData] = useState({});
  // const [text, settext] = useState("");
  const [planetsrotate, setplanetsrotate] = useState();
  const theme = useSelector((state) => state.theme.theme);
  //hooks for advertise
  // const [advertisements, setAdvertisements] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [adverror, advsetError] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [Ring_rotation, setRotation] = useState(0);

  const labelMap = {
    VikramSamvat: "Vikram Samvat Date",
    Indian_date: "Indian Date",
    Vedic_date: "Vedic Date",
  };

  //logic for advertise
  const apiKey = process.env.REACT_APP_API_KEY;

  //customisable date selection
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const saved = localStorage.getItem("selectedDates");
    if (saved) {
      setSelectedDates(JSON.parse(saved));
    }
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => {
  //   const updateLanguage = () => {
  //     const lang = localStorage.getItem("Language");
  //     if (lang === "Hindi") {
  //       settext("Kalayaan");
  //     } else if (lang === "Marathi") {
  //       settext("कालायन");
  //     } else {
  //       settext("कालायन");
  //     }
  //   };

  //   updateLanguage(); // Run on mountx`
  // }, []);

  const getdata = useCallback(async () => {
    const currentDates = new Date(); // or new Date("2025-04-21")
    const day = String(currentDates.getDate()).padStart(2, "0"); // Get day (e.g., '28')
    const month = currentDates.toLocaleString("default", { month: "short" }); // Get abbreviated month (e.g., 'Apr')
    const year = String(currentDates.getFullYear()).slice(-2); // Get last 2 digits of the year (e.g., '25')

    // Format as 'DD-MMM-YY' (e.g., '28-Apr-25')
    const formatted = `${day}/${month}/${year}`;
    console.log("Formatted Gregorian Date:", formatted); // Just for debugging
    try {
      const response = await fetch(
        apiKey + "api/admin/get_data/" + localStorage.getItem("language"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            date: formatted,
          }),
        }
      );
      const result = await response.json();

      // Store in localStorage
      localStorage.setItem("data", JSON.stringify(result));
      setdata(result[0]);
    } catch (error) {
      console.log(error);
    }
  }, [apiKey]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setInterval(() => {
      const storedData = JSON.parse(localStorage.getItem("data"));
      const currentDates = new Date(); // or new Date("2025-04-21")
      const day = String(currentDates.getDate()).padStart(2, "0"); // Get day (e.g., '28')
      const month = currentDates.toLocaleString("default", { month: "short" }); // Get abbreviated month (e.g., 'Apr')
      const year = String(currentDates.getFullYear()).slice(-2); // Get last 2 digits of the year (e.g., '25')

      // Format as 'DD-MMM-YY' (e.g., '28-Apr-25')
      const formatted = `${day}/${month}/${year}`;
      const datas = Array.isArray(storedData)
        ? storedData.filter((name) => name.Gregorian_date === formatted)
        : [];

      setdata(datas);
    }, 3000);
  }, []);
  const Notification = useCallback(async () => {
    try {
      const response = await fetch(apiKey + "Get_notification", {
        credentials: "include",
      });
      const result = await response.json();
      // setnotify(result[0]);

      // Store in localStorage
      localStorage.setItem("notification", JSON.stringify(result[0]));
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      const storedNotification = JSON.parse(
        localStorage.getItem("notification")
      );
      const [startHour, startMinute] =
        storedNotification.Start_time.split(":").map(Number);
      const [endHour, endMinute] =
        storedNotification.End_Time.split(":").map(Number);

      const startMinutes = startHour * 60 + startMinute;
      const endMinutes = endHour * 60 + endMinute;

      if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
        console.log("notify");
        setnotify(storedNotification);
        console.log(storedNotification);
      }
    } catch (error) {
      console.log(error);
    }
  }, [apiKey]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getdata();
    Notification();
  }, [getdata, Notification]);

  // const fetchAdvertisements = async () => {
  //   try {
  //     const response = await axios.get(apiKey + "advertise"); // change port to 4000
  //     setAdvertisements(response.data.data);
  //   } catch (err) {
  //     advsetError(
  //       err.response
  //         ? err.response.data.message
  //         : "Error fetching advertisements"
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => {
  //   fetchAdvertisements();
  // }, []);
  // const [error, setError] = useState(null);

  // logic for notification change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => {
  //   const timerId = setInterval(() => {
  //     setTime(new Date());
  //   }, 200); // Update time every second

  //   return () => clearInterval(timerId); // Cleanup the interval on component unmount
  // }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => {
  //   const updateTodaysData = () => {
  //     const now = new Date();
  //     const todayString = now.toLocaleDateString("en-GB", {
  //       day: "numeric",
  //       month: "long",
  //       year: "numeric",
  //     });

  //     const todayData =
  //       data.find((item) => item.gregorianDate === todayString) || {};
  //     setTodaysData(todayData);
  //   };

  //   updateTodaysData(); // Call the function to get today's data

  //   const dateChangeInterval = setInterval(updateTodaysData, 60 * 1000); // Update every minute

  //   return () => clearInterval(dateChangeInterval);
  // }, []);

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

  // let date = time.getDate();
  // if (hours < 6) {
  //   date = date - 1;
  // }
  //ensure datechanged only at 6 am
  // let indianDate = datefunction(date)[0]; //"  25 Ashwin 1946"
  // let vedicDate = datefunction(date)[1]; //"25 Isha Maas 5126"

  // let originX = -30; // + 20*Math.sin(seconds*6);
  // let originY = -25; //Math.sin(seconds*6);
  // //var Rangle = Number(ghatikaCount) + 30;

  // let thekaran = "विष्टी";
  // let theyog = "he";
  // let thenaxatra = "he";

  const gregdate = new Date().toDateString(); // This will return something like "Sun Nov 04 2024"
  const commaSeparatedDate = gregdate.split(" ").join(", "); // Splitting by spaces and joining with ', '

  //for planet selection

  const [selectedPlanets] = useState(() => {
    const saved = localStorage.getItem("selectedPlanets");
    return saved ? JSON.parse(saved) : [];
  });

  // const togglePlanet = (planetKey) => {
  //   setSelectedPlanets((prev) =>
  //     prev.includes(planetKey)
  //       ? prev.filter((k) => k !== planetKey)
  //       : [...prev, planetKey]
  //   );
  // };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => {
  //   const now = new Date();
  //   const secondsSinceMidnight =
  //     now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  //   const initialRotation = (secondsSinceMidnight / 86400) * 360;

  //     // Set the initial rotation
  //     setRotation(initialRotation)
  //     console.log(initialRotation)
  //      ;
  // }, [Ring_rotation]);
  const makeAPICall = useCallback( async () => {
    try {
      const response = await fetch(apiKey + "api/user/Nakshtra", {
        method: "GET",
      });

      if (response.ok) {
        const result = await response.json();
        setplanetsrotate(result);

        if (result[0]?.Nakshatra_mandal) {
          const dbRotation = parseFloat(result[0].Nakshatra_mandal); // Initial rotation from DB
          applyTimeBasedRotation(dbRotation); // Call time-based update
        }
      }
    } catch (error) {
      console.log("❌ API call error:", error);
    }
  },[apiKey]);

  // Helper to calculate how much to rotate since 5:30 AM based on time
  const applyTimeBasedRotation = (initialRotation = 0) => {
    const now = new Date();

    // Get 5:30 AM today
    const start = new Date(now);
    start.setHours(5, 30, 0, 0);

    // If now is before 5:30 AM, use 5:30 AM of previous day
    if (now < start) {
      start.setDate(start.getDate() - 1);
    }

    // Total seconds in 24 hours
    const totalSeconds = 24 * 3600;

    // Time passed since last 5:30 AM
    const secondsSinceStart = (now.getTime() - start.getTime()) / 1000;

    // Rotation since 5:30 AM
    const rotationSinceStart = (secondsSinceStart / totalSeconds) * 360;

    // Final rotation = saved rotation + time-based rotation
    const finalRotation = (initialRotation + rotationSinceStart) % 360;
    setRotation(finalRotation);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    localStorage.setItem("selectedPlanets", JSON.stringify(selectedPlanets));
  }, [selectedPlanets]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    makeAPICall();
    const interval = setInterval(() => {
      const now = new Date();
      if (
        now.getHours() === 14 &&
        now.getMinutes() === 5 &&
        now.getSeconds() === 0
      ) {
        makeAPICall();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [makeAPICall]);

  return (
    <>
      <div className="container-fluid main ">
        <br />
        <br />
        <br />
        <br />

        <div className="container-fluid mb-2 mt-[-80px]">
          <div className="grid grid-cols-3 items-center">
            {/* Left Column: Ayan */}
            <div className="text-left font-bold text-2xl "></div>

            {/* Center Column: Image or Text */}
            <div className="flex justify-center items-center">
              <img src={klogo} alt="Kalayan" className="w-30 h-[40px]" />
              {/* Or use text instead of image: */}
              {/* <h3 className="text-danger text-4xl font-bold">|| कालायन ||</h3> */}
            </div>

            {/* Right Column: Rutu */}
            <div className="text-right font-bold text-2xl "></div>
          </div>
        </div>

        <div
          style={{ position: "absolute", top: "100px", left: "5px" }}
          className={`${
            theme === "light" ? "text-gray-100" : "text-gray-700"
          } font-bold`}
        >
          अयन : {data?.length > 0 ? data[0].Ayan : ""}
        </div>

        <div
          style={{ position: "absolute", top: "100px", right: "3%" }}
          className={`${
            theme === "light" ? "text-gray-100" : "text-gray-700"
          } font-bold`}
        >
          ऋतु : {data?.length > 0 ? data?.[0].Rutu : ""}
        </div>
        <br />
        <br />

        {/* clock dial */}
        <div className={`container-fluid ${styles.clockContainer} mt-[-30px]`}>
          {/* Kalayan Clock Wrapper */}
          <div className={`${styles.clock}`}>
            {/* Rotating Background Images */}
            <style>
              {`
              @keyframes rotateClockwise {
                  from {
                    transform: rotate(${Ring_rotation + 180}deg);
                  } 
                  to {
                    transform: rotate(${360 + Ring_rotation + 180}deg);
                  }
                }`}
            </style>
            <div
              className={`${styles.clockBackground}`}
              style={{
                animation: "rotateClockwise 86400s linear infinite",
              }}
            >
              <img src={clockImage} alt="Kalayan Clock Background" />
              {}
            </div>
            {/* Inner Circle Image */}
            <img
              src={
                localStorage.getItem("bg")
                  ? localStorage.getItem("bg")
                  : innerClockImage
              }
              alt="Inner Circle"
              className={`${styles.innerClockBackground}`}
            />

            {/* Vipal Dial */}
            <div
              className={`${styles.dial} ${styles.vipal}`}
              style={{
                transform: `translate(-42%, -100%) rotate(${vipalRotation}deg)`,
              }}
            ></div>

            {/* Pal Dial */}
            <div className={`${styles.dial}`}>
              <div
                className={`${styles.minkata}`}
                style={{
                  transform: `translate(-20%, -140%) rotate(${palRotation}deg)`,
                }}
              >
                <img src={minkata} alt="Pal Hand" />
              </div>
            </div>

            {/* Ghatika Dial */}
            <div className={`${styles.dial}`}>
              <div
                className={`${styles.taskata}`}
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
            <div
              className={`font-bold text-2xl ${
                theme === "light" ? "text-gray-100" : "text-gray-700"
              }`}
            >
              सूर्योदय:-{data?.[0]?.Suryoday && data?.[0]?.Suryoday}
            </div>
            <div
              className={`flex justify-end font-bold text-2xl  ${
                theme === "light" ? "text-gray-100" : "text-gray-700"
              }`}
            >
              सूर्यास्त:-{data?.[0]?.Suryasta && data?.[0]?.Suryasta}
            </div>
          </div>
        </div>

        <JupiterRotation
          rotation={planetsrotate}
          mandal={Ring_rotation}
          isVisible={selectedPlanets.includes("jupiter")}
        />
        <KetuRotation
          rotation={planetsrotate}
          mandal={Ring_rotation}
          isVisible={selectedPlanets.includes("ketu")}
        />
        <MarsRotation
          rotation={planetsrotate}
          mandal={Ring_rotation}
          isVisible={selectedPlanets.includes("mars")}
        />
        <MoonRotation
          rotation={planetsrotate}
          mandal={Ring_rotation}
          isVisible={selectedPlanets.includes("moon")}
        />
        <RahuRotation
          rotation={planetsrotate}
          mandal={Ring_rotation}
          isVisible={selectedPlanets.includes("rahu")}
        />
        <MercuryRotation
          rotation={planetsrotate}
          mandal={Ring_rotation}
          isVisible={selectedPlanets.includes("mercury")}
        />
        <SunRotation
          rotation={planetsrotate}
          mandal={Ring_rotation}
          isVisible={selectedPlanets.includes("sun")}
        />
        <SaturnRotation
          rotation={planetsrotate}
          mandal={Ring_rotation}
          isVisible={selectedPlanets.includes("saturn")}
        />
        <VenusRotation
          rotation={planetsrotate}
          mandal={Ring_rotation}
          isVisible={selectedPlanets.includes("venus")}
        />
        {/* Time Tables Section */}

        {/* First Table Section */}
        <div
          className={`d-flex ${styles.vedind} gap-1 justify-content-between w-full h-[177px] max-md:flex-wrap flex-nowrap`}
        >
          <table className={`${styles.table}  w-full md:w-auto`}>
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
                <td style={{ fontSize: "1.8rem" }}>Std</td>
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

          <table className={`${styles.table}  w-full md:w-auto`}>
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
                <td style={{ backgroundColor: "#FFF3B0", fontSize: "1.8rem" }}>
                  Std
                </td>
                <td style={{ backgroundColor: "#FFF3B0", fontSize: "1.8rem" }}>
                  {hours < 10 ? "0" + hours : hours}
                </td>
                <td style={{ backgroundColor: "#FFF3B0", fontSize: "1.8rem" }}>
                  {minutes < 10 ? "0" + minutes : minutes}
                </td>
                <td style={{ backgroundColor: "#FFF3B0", fontSize: "1.8rem" }}>
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
        <table
          className={`${styles.table} ${styles.tithitable} bg-[light-purple] text-white shadow-lg w-full rounded-lg mt-[13px]`}
        >
          <tbody className="w-full h-full">
            <tr className={`${styles.customBorder}`}>
              <td className={`${styles.tithitd} py-1`}>
                <strong className="">पूर्णिमांत तिथी:</strong>
                <span className={`${styles.tithivalue}`}>
                  {data?.length > 0 ? data?.[0].Purnimant_tithi : ""}
                </span>
              </td>
              <td className={`${styles.tithitd} py-1`}>
                <strong className="">आमांत तिथी:</strong>
                <span className={`${styles.tithivalue} `}>
                  {data?.length > 0 ? data?.[0].Amant_tithi : ""}
                </span>
              </td>
              <td className={`${styles.tithitd} py-1`}>
                <strong className="">नक्षत्र:</strong>
                <span className={`${styles.tithivalue} `}>
                  {data?.length > 0 ? data?.[0].Nakshatra : ""}
                </span>
              </td>
            </tr>
            <tr className={`${styles.customBorder} py-1`}>
              <td className={`${styles.tithitd}`}>
                <strong className="">दिनकरण:</strong>
                <span className={`${styles.tithivalue} `}>
                  {data?.length > 0 ? data?.[0].DivaKaran : ""}
                </span>
              </td>
              <td className={`${styles.tithitd} py-1`}>
                <strong className="">रात्रीकरण:</strong>
                <span className={`${styles.tithivalue} `}>
                  {data?.length > 0 ? data?.[0].RatriKaran : ""}
                </span>
              </td>
              <td className={`${styles.tithitd} py-1`}>
                <strong className="">योग:</strong>
                <span className={`${styles.tithivalue} `}>
                  {data?.length > 0 ? data?.[0].Yog : ""}
                </span>
              </td>
            </tr>
            <tr className={`${styles.customBorder} w-full`}>
              <td className={`${styles.tithivalue} text-left`}>दिनविशेष:</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>

        {/* ind ved greg time section  */}

        <div className="d-flex justify-between qrindved w-full mt-[-14px]">
          <table
            className={`${styles.table} ${styles.indvedgreg} table-bordered table-striped table-hover w-full max-h-[80px] m-auto`}
          >
            <tbody>
              {selectedDates.map((key) => (
                <tr key={key} style={{ height: "30px" }}>
                  <th className="!text-[1.2rem]">{labelMap[key]}</th>
                  <td>{data?.length > 0 ? data?.[0][key] : ""}</td>
                </tr>
              ))}

              {/* Always show Gregorian date */}
              <tr style={{ height: "30px" }}>
                <th className="!text-[1.2rem]">Greg. Date</th>
                <td>{commaSeparatedDate}</td>
              </tr>
            </tbody>
          </table>

          <div className="bg-white h-[190px] m-auto">
            <img
              src={qrcode}
              alt="Kalayan Clock Brochure"
              className="object-cover h-full w-full"
            />
          </div>
        </div>

        {/* Notification */}
        <div className="container-fluid notification  border border-success  bg-success mt-2">
          {/* {error && <p style={{ color: "red" }}>Error: {error}</p>} */}
          <p className="text-white w-full text-center">
            {notify?.Marathi_text}
          </p>
        </div>
      </div>
    </>
  );
};
export default NoAdClock;
