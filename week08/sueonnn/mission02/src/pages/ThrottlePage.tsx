import React, { useEffect, useState } from "react";
import { useThrottle } from "../hooks/useThrottle";

const ThrottlePage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const throttledScrollY = useThrottle(scrollY, 2000);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ height: "300vh" }} className="bg-gray-100">
      <div className="fixed top-0 left-0 right-0 p-4 bg-white shadow-md text-center">
        <h2>⚠️ Throttle Example</h2>
        <p className="mt-2">Scroll down and watch the values.</p>
      </div>

      <div className="mt-24 flex flex-col items-center">
        <div className="p-4 bg-red-100 rounded-lg mb-4 w-80">
          <p className="font-semibold text-red-700">
            ❌ Raw Scroll Y (no throttle):
          </p>
          <p className="text-xl">{scrollY}</p>
        </div>

        <div className="p-4 bg-green-100 rounded-lg w-80">
          <p className="font-semibold text-green-700">
            ✅ Throttled Scroll Y (2000ms):
          </p>
          <p className="text-xl">{throttledScrollY}</p>
        </div>
      </div>
    </div>
  );
};

export default ThrottlePage;
