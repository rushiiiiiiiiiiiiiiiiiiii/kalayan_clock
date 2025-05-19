import React ,{useEffect,useState} from "react";
import SettingsPanel from "./SettingsPanel";
import DateType from "./DateTypeSelector"; // your checkbox block
import MediaSettingsCard from "./MediaSetting";
import TvInfoCard from "./TvInfoCard";
import PlanetSelector from "./PlanetSelector";

export default function SettingsPage() {
    const [selectedPlanets, setSelectedPlanets] = useState(() => {
      const saved = localStorage.getItem("selectedPlanets");
      return saved ? JSON.parse(saved) : [];
    });
  
    const togglePlanet = (planetKey) => {
      setSelectedPlanets((prev) =>
        prev.includes(planetKey)
          ? prev.filter((k) => k !== planetKey)
          : [...prev, planetKey]
      );
    };
  
    useEffect(() => {
      localStorage.setItem("selectedPlanets", JSON.stringify(selectedPlanets));
    }, [selectedPlanets]);
  
  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-800">
      <h1 className="text-2xl font-bold mb-6 text-center">Settings</h1>

      <div className="flex flex-wrap gap-6 justify-center">
        {/* Date Selection Card */}
        <div className="w-full md:w-[45%] lg:w-[30%] bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <TvInfoCard />
        </div>
        <div className="w-full md:w-[45%] lg:w-[30%] bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <DateType />
        </div>

    <div className="w-full md:w-[45%] lg:w-[30%] bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
         <PlanetSelector
        selectedPlanets={selectedPlanets}
        togglePlanet={togglePlanet}
      />
        </div>


        {/* Settings Panel Card */}
        <div className="w-full md:w-[45%] lg:w-[30%] bg-white shadow-md dark:bg-gray-700 p-6 rounded-lg ">
          <SettingsPanel />
        </div>

        {/* You can add more cards like this later */}
        <div className="w-full md:w-[45%] lg:w-[30%] bg-white p-6 rounded-lg shadow-md">
          <MediaSettingsCard />
        </div>
      </div>
    </div>
  );
}
