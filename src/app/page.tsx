"use client"

import Sidebar from "./components/sidebar";
import React, {useState} from "react";

export default function Home() {
  const [pageStage, setPageStage] = useState<string>("Home")

  const handlePageStage = (stage:string):void => {
    setPageStage(stage)
  }
  return (
    <main>
      <Sidebar handlePageStage={handlePageStage} pageStage={pageStage}/>
    </main>
  );
}
