// import { useAppSelector } from "./redux/store";
'use client'

import ProductCard from "@/components/ProductCard";
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
      <div className="mygrid min-h-[500px] mt-5 grid grid-cols-5 gap-5">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard /> 
        <ProductCard /> 
        <ProductCard /> 
        <ProductCard /> 
        <ProductCard /> 
        <ProductCard /> 
        <ProductCard /> 
        <ProductCard /> 
        <ProductCard /> 
        <ProductCard /> 
        <ProductCard /> 
      </div>
    </div>
  )
}
