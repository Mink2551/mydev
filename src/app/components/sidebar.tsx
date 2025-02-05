"use client"

import React, { JSX, useState } from 'react';
import Image from 'next/image';
import MydevLogo from '../../../public/MydevLogo.png';

// Import Icons
import { FaHome, FaBookOpen } from 'react-icons/fa';
import { MdStickyNote2 } from 'react-icons/md';
import { RiCalendarScheduleFill } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { FiSettings } from "react-icons/fi";

function Sidebar({ handlePageStage, pageStage }: { handlePageStage: (stage: string) => void; pageStage: string }) {
  // Set Variable For Hover
  const [isHover, setIsHover] = useState<boolean>(false);

  // Component for Icons
  const IconComponent = ({ icon: Icon, name, stage, margin }: { icon: React.ElementType; name: string; stage: string; margin: string }): JSX.Element => {
    return (
      // On click Change pageStage
      <div
        onClick={() => handlePageStage(stage)}
        className={`w-[60px] justify-center cursor-pointer hover:opacity-80 transition-all flex ${pageStage === stage ? 'opacity-100 ' : 'opacity-30'}`}
      >
        {/* Content */}
        <Icon className={`text-2xl text-palette4 absolute mt-${margin}`} />
        {isHover ? (
          <div>
            <p className={`absolute mt-${margin} left-12 font-medium w-[70%] rounded-sm pl-2 flex items-center hover:bg-gray-300 hover:bg-opacity-5 text-palette4 ${pageStage === stage ? 'bg-gray-300 bg-opacity-10' : ''}`}>{name}</p>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  };

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`h-[100vh] relative bg-palette1 border-r border-gray-600 duration-300 flex flex-col ${isHover ? 'w-[200px]' : 'w-[60px]'}`}
    >
      {/* Logo */}
      <Image src={MydevLogo} alt="MyDevLogo" className="rounded-full absolute max-w-[60px] scale-125 mx-auto mt-3" />
      {/* Icons */}
      <div className="mt-20 flex flex-col gap-8">
        <IconComponent icon={FaHome} name="Home" stage="Home" margin="5" />
        <hr className="border-1 w-[90%] left-[50%] translate-x-[-50%] opacity-10 mt-5 relative" />
        <IconComponent icon={MdStickyNote2} name="Notes" stage="Note" margin="0" />
        <IconComponent icon={FaBookOpen} name="KarnBan" stage="Homework" margin="5" />
        <hr className="border-1 w-[90%] left-[50%] translate-x-[-50%] opacity-10 mt-10 relative" />
        <IconComponent icon={RiCalendarScheduleFill} name="Schedule" stage="Schedule" margin="0" />
        <div className='bottom-24 absolute w-[100%]'>
            <IconComponent icon={FiSettings} name="Setting" stage="Setting" margin="0" />
            <IconComponent icon={CgProfile} name="Profile" stage="Profile" margin="12" />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
