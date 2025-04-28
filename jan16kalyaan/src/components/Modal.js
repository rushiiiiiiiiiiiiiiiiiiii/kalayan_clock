import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import {Links} from 'react-router-dom'
export default function Modal({ open, close }) {
    const [language,setlanguage]=useState(localStorage.getItem("language") || "English")
    const [Location,setLocation]=useState()
    //   const [isOpen, setIsOpen] = useState(true);
    useEffect(()=>{
        localStorage.setItem("Language",language)
    },[language])
    const setlocation=()=>{
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
    return (
        <>
            {open && (
                <div className="flex items-center justify-center h-screen bg-gray-100 absolute w-11/12 left-10 z-[10]">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                        <h2 className="text-xl font-bold mb-4">Setting</h2>
                        <ul className="w-full text-start">
                            <li className="text-xl font-bold hover:bg-gray-200 p-2 rounded">
                                <Link className="text-black no-underline" to={"/bg"}>Change Image</Link>
                            </li>
                            <li className="text-xl font-bold  hover:bg-gray-200 p-2 rounded">
                                <label for="cars">Choose a Language:</label>

                                <select id="cars" value={language} onChange={(e)=>setlanguage(e.target.value)}> 
                                    <option value="English">English</option>
                                    <option value="Hindi">Hindi</option>
                                    <option value="Marathi">Marathi</option>
                                </select>


                            </li>
                            <li onClick={setlocation} className="text-xl font-bold hover:bg-gray-200 p-2 rounded cursor-pointer">Location</li>
                        </ul>
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
