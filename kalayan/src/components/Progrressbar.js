import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function SunPositionSlider() {
  const containerRef = useRef(null);
  const ballSize = 24; // w-6/h-6
  const [progress, setProgress] = useState(0);

  // Auto-calculate progress based on date
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();

    const june21 = new Date(year, 5, 21);      // Months are 0-based (June = 5)
    const dec21 = new Date(year, 11, 21);      // December = 11

    // If today is before June 21, assume we're still in the previous cycle
    if (today < june21) {
      setProgress(100); // Top
      return;
    }

    const totalDays = (dec21 - june21) / (1000 * 60 * 60 * 24); // ~183
    const daysPassed = (today - june21) / (1000 * 60 * 60 * 24);

    const newProgress = Math.min(100, Math.max(0, (daysPassed / totalDays) * 100));
    setProgress(newProgress);
  }, []);

  const handleDrag = (event, info) => {
    const containerHeight = containerRef.current.offsetHeight - ballSize;
    const newY = Math.min(Math.max(info.point.y, 0), containerHeight);
    const newProgress = (newY / containerHeight) * 100;
    setProgress(newProgress);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        ref={containerRef}
        className="relative w-7 h-64 bg-purple-700 rounded-lg"
      >
        {/* Top Label */}
        <p className="absolute top-2 left-1/2 -translate-x-1/2 text-white text-xs">
          <span className="bg-purple-700 text-purple-800">_</span> S 23.5
        </p>

        {/* Draggable Ball */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-yellow-400 border-2 border-gray-800 rounded-full cursor-pointer"
          drag="y"
          dragConstraints={containerRef}
          dragElastic={0.1}
          dragMomentum={false}
          onDrag={handleDrag}
          style={{
            top: `${(progress / 100) * (256 - ballSize)}px`, // 256 = h-64 in px
          }}
        />

        {/* Bottom Label */}
        <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white text-xs">
          23.5 <span className="bg-purple-700 text-purple-800">_</span> N
        </p>
      </div>
    </div>
  );
}
