import React from "react";

const WheelComponent = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      {/* Outer Wheel */}
      <div className="relative w-80 h-80 border-8 border-gray-400 rounded-full flex items-center justify-center animate-spin-slow">
        {/* Middle Wheel */}
        <div className="absolute w-40 h-40 border-8 border-gray-300 rounded-full flex items-center justify-center animate-spin-reverse">
          {/* Inner Wheel */}
          <div className="absolute w-20 h-20 border-8 border-gray-200 rounded-full animate-spin" />
        </div>
      </div>
    </div>
  );
};

export default WheelComponent;

// Tailwind CSS Animations (Add these to your global styles if needed)
// Inside tailwind.config.js, extend animation
// module.exports = {
//   theme: {
//     extend: {
//       animation: {
//         'spin-slow': 'spin 6s linear infinite',
//         'spin-reverse': 'spin 4s linear infinite reverse',
//       },
//     },
//   },
// };
