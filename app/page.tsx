// import { useAppSelector } from "./redux/store";
'use client'

import Flashsale from "@/components/Sections/Flashsale";
import ProductCard from "@/components/Product/ProductCard";
import ServicesSection from "@/components/Sections/ServicesSection";
import Slides from "@/components/Sections/Slides";
import TopCategoriesSection from "@/components/Sections/TopCategoriesSection";
import BestSellerSection from "@/components/Sections/BestSellerSection";
import { useAppSelector } from "@/redux/store"; 
import { useEffect } from "react";
import TopProductsSection from "@/components/Sections/TopProductsSection";
import PreOrderSection from "@/components/Sections/PreOrderSection"; 
import VouchersSection from "@/components/Sections/VouchersSection";
import SubscribeFormSection from "@/components/Sections/SubscribeFormSection";
import NewsSection from "@/components/Sections/NewsSection"; 


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
      <TopProductsSection category={"KIT bàn phím cơ"} direction={true}/> 
      <TopProductsSection category={"Switch bàn phím cơ"} direction={true}/> 
      <TopProductsSection category={"Keycap"}  direction={true}/> 

      <VouchersSection />
      <SubscribeFormSection />
      <NewsSection />

      {/* <PreOrderSection /> */}

      {/* <TopCategoriesSection /> */}
    </div>
  )
}
