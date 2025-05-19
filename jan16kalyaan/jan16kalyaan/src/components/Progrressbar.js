import { useState } from "react";
import { motion } from "framer-motion";

const VerticalProgressBar = () => {
  const [progress, setProgress] = useState(0);

  const handleDrag = (event, info) => {
    const newProgress = Math.max(0, Math.min(100, (info.point.y / 100) * 100));
    setProgress(newProgress);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-10 h-96 bg-[purple] rounded-lg flex flex-col">
        <p className="top-4 absolute text-white">S 23.5</p>
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-[yellow] border-2 border-gray-800 rounded-full cursor-pointer"
          drag="y"
          dragConstraints={{ top: 0, bottom: 300 }}
          dragElastic={0.1}
          onDrag={handleDrag}
          style={{ top: `calc(${progress}% + 210px)` }} // Adjusting position for correct alignment
        />
        <p className=" text-white absolute bottom-0">23.5 N</p>
      </div>
      
    </div>
  );
};

export default VerticalProgressBar;

