const PlanetSelector = ({ selectedPlanets, togglePlanet }) => {
  const planetOptions = [
    { label: "Jupiter", key: "jupiter" },
    { label: "Mars", key: "mars" },
    { label: "Venus", key: "venus" },
    { label: "Mercury", key: "mercury" },
    { label: "Saturn", key: "saturn" },
    { label: "Moon", key: "moon" },
    { label: "Sun", key: "sun" },
    { label: "Rahu", key: "rahu" },
    { label: "Ketu", key: "ketu" },
  ];

  return (
    <div className="p-4">
      <h2 className="font-bold mb-2">Select Planets</h2>
      {planetOptions?.map(({ label, key }) => (
        <label key={key} className="block mb-1">
          <input
            type="checkbox"
            checked={selectedPlanets?.includes(key)}
            onChange={() => togglePlanet(key)}
            className="mr-2"
          />
          {label}
        </label>
      ))}
    </div>
  );
};
export default PlanetSelector