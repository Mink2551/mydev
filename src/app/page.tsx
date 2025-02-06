"use client";

// Import Component
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import Configsidebar from "./components/configsidebar";
import Register from "./authentication/register";
import Account from "./authentication/profile/account";
import Login from "./authentication/login";

// Import Logical
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Home() {
  // Declares Staged variable
  const [pageStage, setPageStage] = useState<string>("Home");
  const [authStage, setAuthStage] = useState<string>("login");

  // Declare Path variable
  const [path, setPath] = useState<string>("");

  // Declare Logic variable
  const { data: session} = useSession()

  // Decalre Function Changing Page Stage
  const handlePageStage = (stage: string): void => {
    setPageStage(stage);
  };

  // Decalre Function Changing Auth Stage
  const handleAuthStage = (Path:string): void => {
    setAuthStage(Path);
  };

  // Update Path While PageStage Have Changed
  useEffect(() => {

    // Profile Stage
    if (pageStage === "Profile") {

      // Have a Sessions?
      if (session) {

        // Set Account id have a sections
        setPath("Profile / Account");
      } else {

        // Set Path if don't have a sessions
        setPath(authStage === "login" ? "Profile / Login" : "Profile / Register");
      }

    // Else Profiles 
    } else {
      setPath(pageStage);
    }
  }, [pageStage, authStage, session]);  

  // Body Page
  return (
    <main className="relative min-h-[100vh]">

      {/* Navigations Bar */}
      <div className="sticky z-10 top-0">

        {/* Main Sidebar */}
        <Sidebar handlePageStage={handlePageStage} pageStage={pageStage} />

        {/* Navigation Bar and Path Bar */}
        <Navbar pageStage={pageStage} pathStage={path}/>

        {/* Secondary Sidebar */}
        <Configsidebar pageStage={pageStage} />
      </div>

      {/* Contents */}
      <div className="w-[90vw] flex fixed right-0 z-0 mt-20">

        {/* For Profile Stage */}
        {pageStage === "Profile" ?

        // If have a sessions
          session? (
            <div><Account/></div>
          )
         : (

        // Else Sessions
          authStage === 'login'? (

            // Check Login?
            <Login handleAuthStage={handleAuthStage} />
          ) : (

            // Check Register?
            <Register handleAuthStage={handleAuthStage} />
          )
        ) : null}

        
      </div>
    </main>
  );
}
