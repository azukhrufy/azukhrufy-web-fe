import { useEffect, useState } from "react";

export default function Example() {
  // Countdown target (7 hari dari sekarang untuk contoh)
  const targetDate = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const progress = 52; // contoh progress

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="relative max-w-sm mx-auto">
        <div className="absolute z-10 -top-10 -left-10 w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 flex items-center justify-center shadow-lg">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <path
                id="circlePath"
                d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0"
              />
            </defs>
            <text fill="white" fontSize="8" fontWeight="bold">
              <textPath href="#circlePath" startOffset="0">
                • PRESALE LIVE • PRESALE LIVE
              </textPath>
            </text>
          </svg>
        </div>

        {/* Card */}
        <div>
          {/* Gradient Glow Kiri Atas */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-r from-purple-500 via-indigo-500 to-green-400 rounded-full blur-3xl opacity-30" />

          {/* Gradient Glow Kanan Atas */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-r from-green-400 via-indigo-500 to-purple-500 rounded-full blur-3xl opacity-30" />

          <div
            // className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl shadow-lg p-6"
            className="bg-white/5 backdrop-blur-lg border border-white/20 text-white rounded-2xl shadow-xl p-6"
          >
            <p className="text-center text-sm text-purple-300 font-semibold mb-2">
              STAGE 4: 5% BONUS!
            </p>

            {/* Countdown */}
            <div className="text-center">
              <p className="text-xs text-gray-400">PRE-SALE ENDS IN</p>
              <div className="flex justify-center space-x-2 text-2xl font-bold mt-2">
                <span>{timeLeft.days}d</span>:<span>{timeLeft.hours}h</span>:
                <span>{timeLeft.minutes}m</span>:
                <span>{timeLeft.seconds}s</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-400 h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Raised: 1,042,812</span>
                <span>Goal: 2,000,000</span>
              </div>
            </div>

            {/* Token Info */}
            <div className="mt-6 text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Token Name</span>
                <span className="font-medium">Gittu Token</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Token Symbol</span>
                <span className="font-medium">GITTU</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Current Stage</span>
                <span className="font-medium">0.0004</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Next Stage</span>
                <span className="font-medium">0.0004</span>
              </div>
            </div>

            {/* Button */}
            <button className="mt-6 w-full bg-green-400 text-black font-bold py-3 rounded-xl hover:bg-green-300 transition">
              BUY GITTU NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
