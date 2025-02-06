"use client"

import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import HomeConfig from "./utils/HomeConfig";
import NoteConfig from "./utils/NoteConfig";
import HomeWorkConfig from "./utils/HomeWorkConfig";
import ScheduleConfig from "./utils/ScheduleConfig";

function ConfigSidebar({ pageStage }: { pageStage: string }) {
  // Declare the state for size, but initialize it as empty until window is defined on the client
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Only runs on the client-side
      const handleResize = () => {
        setSize({ w: window.innerWidth, h: window.innerHeight });
        setIsOpen(window.innerWidth >= 750);
      };

      window.addEventListener("resize", handleResize);
      handleResize(); // Initial call to set size on mount
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const Content = () => {
    return (
      <div>
        {
          pageStage === "Home" ? 
            (<HomeConfig />)
          : pageStage === "Note" ? 
            (<NoteConfig />)
          : pageStage === "Homework" ? 
            (<HomeWorkConfig />)
          : pageStage === "Schedule" ? 
            (<ScheduleConfig />)
          : ""
        }
      </div>
    );
  };

  if (size === null) return null; // Prevent rendering before client-side size is available

  return (
    <div className="relative left-[60px]">
      {
        pageStage === "Home" || pageStage === "Homework" || pageStage === "Note" || pageStage === "Schedule" ?
        (
          <div className="relative">
            <div
              className={`fixed top-0 left-[60px] h-full bg-palette1 text-white transition-transform duration-300 border-r border-gray-600 w-[200px] 
                ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
              <Content />
            </div>
            {size.w < 750 && (
              <button 
                className={`absolute top-2 ${isOpen ? "left-[150px]" : "left-4 opacity-80 -z-10"} p-2 duration-200 hover:bg-gray-700 bg-gray-800 text-white rounded-md z-50`} 
                onClick={() => setIsOpen(!isOpen)}
              >
                <Menu size={24} />
              </button>
            )}
          </div>
        ) : (
          <div />
        )
      }
    </div>
  );
}

export default ConfigSidebar;
