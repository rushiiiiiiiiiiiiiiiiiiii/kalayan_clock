// SettingsPage.jsx
import { useState, useEffect } from "react";


const DateType = () => {
  const options = [
    { label: "Vikram Samvat", key: "VikramSamvat" },
    { label: "Indian Date", key: "Indian_date" },
    { label: "Vedic Date", key: "Vedic_date" },
    { label: "shak samvat Date", key: "shak samvat Date" },
  ];

  const [selectedDates, setSelectedDates] = useState(() => {
    const saved = localStorage.getItem("selectedDates");
    return saved ? JSON.parse(saved) : [];
  });

  const handleChange = (key) => {
    let updated = [...selectedDates];
    if (updated.includes(key)) {
      updated = updated.filter((k) => k !== key);
    } else if (updated.length < 3) {
      updated.push(key);
    }
    setSelectedDates(updated);
  };

  useEffect(() => {
    localStorage.setItem("selectedDates", JSON.stringify(selectedDates));
  }, [selectedDates]);

  return (
   
    <>
       <div className="p-6">
      <h2 className="text-lg font-bold mb-4">Select Date Types</h2>
      {options.map((opt) => (
        <label key={opt.key} className="block mb-2">
          <input
            type="checkbox"
            checked={selectedDates.includes(opt.key)}
            onChange={() => handleChange(opt.key)}
            disabled={
              !selectedDates.includes(opt.key) && selectedDates.length >= 4
            }
            className="mr-2"
          />
          {opt.label}
        </label>
      ))}
   <p class="text-sm text-gray-500">
  Please select a maximum of 3 dates.
</p>

      <p className="text-sm text-gray-500 mt-4">Selections will reflect on the UI</p>
      </div>


    </>
  );
};

export default DateType;
