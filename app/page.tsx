// import { useAppSelector } from "./redux/store";
'use client'

import Flashsale from "@/components/Flashsale";
import ProductCard from "@/components/ProductCard";
import ServicesSection from "@/components/ServicesSection";
import Slides from "@/components/Slides";
import TopSellerSection from "@/components/TopSellerSection";
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
      <TopSellerSection />
      <Flashsale date={"2023-08-02"} />
    </div>
  )
}
