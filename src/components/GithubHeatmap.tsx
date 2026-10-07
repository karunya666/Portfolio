"use client";

import React, { useState, useMemo } from "react";
import { soundManager } from "@/utils/sound";
import { githubActivitySnapshot, ContributionDay } from "@/data/githubActivitySnapshot";

export default function GithubHeatmap() {
  const contributions: readonly ContributionDay[] = githubActivitySnapshot.contributions;
  const totalCount = githubActivitySnapshot.totalCount;
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);

  // Group into columns of 7 days (weeks)
  const weeks = useMemo(() => {
    if (contributions.length === 0) return [];
    const grouped: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];

    // Slice to the last 36-38 weeks for optimal bento box display
    const daysToShow = contributions.slice(-252); // ~36 weeks

    daysToShow.forEach((day, index) => {
      currentWeek.push(day);
      if (currentWeek.length === 7 || index === daysToShow.length - 1) {
        grouped.push(currentWeek);
        currentWeek = [];
      }
    });

    return grouped;
  }, [contributions]);

  // Themed Electric Blue Palette
  const getThemedClass = (level: number) => {
    switch (level) {
      case 4:
        return "bg-[#60a5fa] shadow-[0_0_12px_rgba(96,165,250,0.85)] border-blue-300";
      case 3:
        return "bg-[#3b82f6] shadow-[0_0_8px_rgba(59,130,246,0.6)] border-blue-400";
      case 2:
        return "bg-[#2563eb] shadow-[0_0_5px_rgba(37,99,235,0.4)] border-blue-500/70";
      case 1:
        return "bg-[#1e3a8a]/80 border-blue-800/50";
      default:
        return "bg-white/[0.06] hover:bg-white/20 border-white/[0.04]";
    }
  };

  const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];

  return (
    <div className="w-full flex flex-col items-center justify-center p-2 sm:p-3 select-none">
      {/* Month headers */}
      <div className="w-full max-w-4xl flex justify-between text-[10px] text-white/50 mb-2 px-1 font-mono">
        {months.map((m, idx) => (
          <span key={idx}>{m}</span>
        ))}
      </div>

      {/* Heatmap grid */}
      <div className="w-full max-w-4xl overflow-x-auto pb-2 scrollbar-none flex justify-center">
        <div className="flex gap-[3.5px] sm:gap-[4px]">
          {weeks.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-[3.5px] sm:gap-[4px]">
              {week.map((cell, cIdx) => (
                <div
                  key={`${wIdx}-${cIdx}`}
                  onMouseEnter={() => {
                    setHoveredDay({ date: cell.date, count: cell.count });
                    if (cell.count > 0) soundManager.playClick(1400);
                  }}
                  onMouseLeave={() => setHoveredDay(null)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[2.5px] border transition-all duration-150 cursor-pointer ${getThemedClass(
                    cell.level
                  )}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom stats and legend */}
      <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-2 mt-3 text-xs text-white/60 font-mono px-1">
        <div className="flex items-center gap-2">
          <span className="text-white/80 font-semibold">{totalCount} contributions in the last year</span>
          <span className="text-blue-400 font-mono text-[11px]">(github.com/karunya666)</span>
          {hoveredDay && (
            <span className="text-blue-400 font-semibold transition-opacity ml-2">
              • {hoveredDay.count} commit{hoveredDay.count === 1 ? "" : "s"} on {hoveredDay.date}
            </span>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 text-[10px]">
          <span className="text-white/40">Less</span>
          <div className="w-2.5 h-2.5 rounded-[2px] bg-white/[0.06] border border-white/[0.05]" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#1e3a8a]/80" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#2563eb]" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#3b82f6] shadow-[0_0_6px_rgba(59,130,246,0.6)]" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#60a5fa] shadow-[0_0_10px_rgba(96,165,250,0.85)]" />
          <span className="text-white/40">More</span>
        </div>
      </div>
    </div>
  );
}
