import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleTheme } from "../Redux/themeSlice";
// import {Links} from 'react-router-dom'
export default function Modal({ open, close }) {
    const [language, setlanguage] = useState(localStorage.getItem("language") || "English")
    const [Location, setLocation] = useState()
    const [isOn, setIsOn] = useState("on")// default to "on" if stored;
  const theme = useSelector((state) => state.theme.theme);

    const dispatch = useDispatch();
    //   const [isOpen, setIsOpen] = useState(true);
    useEffect(() => {
        localStorage.setItem("Language", language)
    }, [language])
    const setlocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                    console.log(Location)
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }
    const handleToggle = () => {
        dispatch(toggleTheme());
        setIsOn(!isOn)
    }
    return (
        <>
            {open && (
                <div className={`${theme == "light" ? "bg-gray-700" : "bg-gray-100"} flex items-center justify-center h-screen absolute w-11/12 left-10 z-[10]`}>
                <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                        <h2 className="text-xl font-bold mb-4">Setting</h2>
                        <ul className="w-full text-start">
                            <li className="text-xl font-bold hover:bg-gray-200 p-2 rounded">
                                <Link className="text-black no-underline" to={"/bg"}>Change Image</Link>
                            </li>
                            <li onClick={setlocation} className="text-xl font-bold hover:bg-gray-200 p-2 rounded cursor-pointer">Location</li>
                            <li className="text-xl font-bold  hover:bg-gray-200 p-2 rounded">
                                <label for="cars">Choose a Language:</label>

                                <select id="cars" value={language} onChange={(e) => setlanguage(e.target.value)}>
                                    <option value="English">English</option>
                                    <option value="Hindi">Hindi</option>
                                    <option value="Marathi">Marathi</option>
                                </select>
                            </li>
                        </ul>
                        <li className="flex mt-2 mb-2">
                            <p className="text-lg text-center font-bold">{isOn ? "Mode: ON" : "Mode: OFF"}</p>
                            <button
                                onClick={handleToggle}
                                className={`w-16 h-8 flex items-center rounded-full p-1 transition duration-300 ease-in-out ${isOn ? 'bg-green-500' : 'bg-gray-400'
                                    }`}
                            >
                                <div
                                    className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${isOn ? 'translate-x-8' : 'translate-x-0'
                                        }`}
                                ></div>
                            </button>


                        </li>

                        <button
                            onClick={() => close(false)}
                            className="w-full py-2 bg-red-600 text-white rounded-md"
                        >
                            Close
                        </button>
                    </div>
                </div>

            )}
        </>
    );
}
