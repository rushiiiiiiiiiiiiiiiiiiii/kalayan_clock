import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function SunPositionSlider() {
  const containerRef = useRef(null);
  const ballSize = 24; // 6rem / 24px
  const [progress, setProgress] = useState(0);

  // Auto-calculate progress based on date (June 21 to Dec 21)
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();

    const june21 = new Date(year, 5, 21);   // Months are 0-based
    const dec21 = new Date(year, 11, 21);

    const totalDays = (dec21 - june21) / (1000 * 60 * 60 * 24); 
    const daysPassed = (today - june21) / (1000 * 60 * 60 * 24);

    let newProgress = (daysPassed / totalDays) * 100;

    // Clamp and invert
    newProgress = Math.min(Math.max(newProgress, 0), 100);
    setProgress(newProgress);
  }, []);

  const handleDrag = (event, info) => {
    if (!containerRef.current) return;

    const containerHeight = containerRef.current.offsetHeight - ballSize;
    const newY = Math.min(Math.max(info.point.y, 0), containerHeight);

    // Invert progress so moving up increases value
    const newProgress = 100 - (newY / containerHeight) * 100;
    setProgress(newProgress);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-1">
      <div className="flex flex-col items-center w-10 md:w-24">
        {/* Top Label */}

        {/* Slider Container */}
        <div
          ref={containerRef}
          className="relative w-10 md:w-7 h-64 md:h-60 bg-purple-700 rounded-xl flex justify-center"
        >
        <p className="text-center text-xs text-white mb-1">
          S 23.5<span className="text-purple-700">_</span>
        </p>
          {/* Draggable Ball */}
          <motion.div
            className="absolute w-6 h-6 md:w-5 md:h-5 bg-yellow-400 border-2 border-gray-800 rounded-full cursor-pointer"
            drag="y"
            dragConstraints={containerRef}
            dragElastic={0.1}
            dragMomentum={false}
            onDrag={handleDrag}
            style={{
              top: `${(1 - progress / 100) * (containerRef.current?.offsetHeight - ballSize)}px`,
            }}
          />

          {/* Bottom Label */}
          <p className="absolute bottom-1 text-center text-xs text-white">
            23.5<span className="text-purple-700">_</span> N
          </p>
        </div>

      </div>
    </div>
  );
}
