// import { useAppSelector } from "./redux/store";
'use client'

import ServicesSection from "@/components/ServicesSection";
import Slides from "@/components/Slides";
import { useAppSelector } from "@/redux/store"; 
import { useEffect } from "react";


export default function Home() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
  })};

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="mysection  min-h-[2500px]">
      <Slides />
      <ServicesSection />
    </div>
  )
}
