"use client";

import React, { useEffect, useState } from "react";

// 5x7 Dot Matrix font representation for digits 0-9 and colon
const MATRIX_DIGITS: { [key: string]: number[][] } = {
  "0": [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ],
  "1": [
    [0, 0, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  "2": [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  "3": [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ],
  "4": [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
  ],
  "5": [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ],
  "6": [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ],
  "7": [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
  ],
  "8": [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ],
  "9": [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ],
  ":": [
    [0],
    [1],
    [0],
    [0],
    [1],
    [0],
    [0],
  ],
};

function MatrixChar({ char }: { char: string }) {
  const matrix = MATRIX_DIGITS[char] || MATRIX_DIGITS["0"];

  return (
    <div className="flex flex-col gap-[2px] sm:gap-[2.5px]">
      {matrix.map((row, rIdx) => (
        <div key={rIdx} className="flex gap-[2px] sm:gap-[2.5px]">
          {row.map((cell, cIdx) => (
            <div
              key={cIdx}
              className={`w-[2.5px] h-[2.5px] sm:w-[3px] sm:h-[3px] rounded-full transition-colors duration-200 ${
                cell === 1
                  ? "bg-white shadow-[0_0_6px_rgba(255,255,255,0.7)]"
                  : "bg-white/10"
              }`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function MatrixClock() {
  const [timeStr, setTimeStr] = useState<string>("00:00:00");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const ss = String(now.getSeconds()).padStart(2, "0");
      setTimeStr(`${hh}:${mm}:${ss}`);
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center p-3 h-full">
        <span className="text-xs text-white/40 font-mono tracking-widest">LOADING CLOCK...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 select-none py-2 px-1">
      {timeStr.split("").map((ch, idx) => (
        <MatrixChar key={idx} char={ch} />
      ))}
    </div>
  );
}
