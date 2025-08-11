import useCountdown from "@/hooks/useCountdown";
import React from "react";

const CountdownBox = ({ endDate }) => {
  const timeLeft = useCountdown(endDate);

  if (!timeLeft) return null;


  return (
    <div className="flex flex-wrap items-center gap-2 mt-3 text-center">
  <div className="flex flex-col items-center">
    <div className="px-2 py-1 text-base font-bold text-white bg-primary rounded-md shadow">
      {String(timeLeft.days).padStart(2, "0")}
    </div>
    <span className="mt-1 text-xs font-semibold text-gray-800">Days</span>
  </div>

  <div className="flex flex-col items-center">
    <div className="px-2 py-1 text-base font-bold text-white bg-primary rounded-md shadow">
      {String(timeLeft.hours).padStart(2, "0")}
    </div>
    <span className="mt-1 text-xs font-semibold text-gray-800">Hours</span>
  </div>

  <div className="flex flex-col items-center">
    <div className="px-2 py-1 text-base font-bold text-white bg-primary rounded-md shadow">
      {String(timeLeft.minutes).padStart(2, "0")}
    </div>
    <span className="mt-1 text-xs font-semibold text-gray-800">Mins</span>
  </div>

  <div className="flex flex-col items-center">
    <div className="px-2 py-1 text-base font-bold text-white bg-primary rounded-md shadow">
      {String(timeLeft.seconds).padStart(2, "0")}
    </div>
    <span className="mt-1 text-xs font-semibold text-gray-800">Secs</span>
  </div>
</div>
  );
};

export default CountdownBox;