// import { useAppSelector } from "./redux/store";
'use client'

import Flashsale from "@/components/Flashsale";
import ProductCard from "@/components/ProductCard";
import ServicesSection from "@/components/ServicesSection";
import Slides from "@/components/Slides";
import TopCategoriesSection from "@/components/TopCategoriesSection";
import BestSellerSection from "@/components/BestSellerSection";
import { useAppSelector } from "@/redux/store"; 
import { useEffect } from "react";
import TopProductsSection from "@/components/TopProductsSection";
import PreOrderSection from "@/components/PreOrderSection";
import VouchersSection from "@/components/VouchersSection";
import SubscribeFormSection from "@/components/SubscribeFormSection";
import NewsSection from "@/components/NewsSection";


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
      <BestSellerSection />
      <Flashsale date={"2023-08-02"} />

      {/* 0: left, 1: right */}
      <TopProductsSection category={"KIT bàn phím"} direction={true}/> 
      <TopProductsSection category={"Switch"} direction={true}/> 
      <TopProductsSection category={"Keycap"}  direction={true}/> 

      <VouchersSection />
      <SubscribeFormSection />
      <NewsSection />

      {/* <PreOrderSection /> */}

      {/* <TopCategoriesSection /> */}
    </div>
  )
}
