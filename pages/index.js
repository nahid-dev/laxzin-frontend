import {
  MdChevronRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import ProductCard from "@/Components/ProductDetails/ProductCard";
import { imageHostName } from "@/lib/config";
import request from "@/lib/request";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import PublishedCategoryCard from "@/Components/PublishedCategoryCard";
import { IoSparkles } from "react-icons/io5";
import { FaBolt, FaLeaf, FaStar, FaTags, FaThLarge } from "react-icons/fa";
import SectionHeader from "@/Components/SectionHeader";
import SlideSectionHeader from "@/Components/SlideSectionHeader";
import TrustBadgeSection from "@/Components/TrustBadgeSection";
import { dummyData, skinCareData } from "@/options";

import CountdownBox from "@/Components/CountdownBox";
import SectionSubHeader from "@/Components/SectionSubHeader";
import HeroSection from "@/Components/Home/HeroSection";
import FeatureSection from "@/Components/Home/FeatureSection";
import CategoryBanner from "@/Components/Home/CategoryBanner";
import BestSellersSection from "@/Components/Home/BestSellersSection";
import LimitedEdition from "@/Components/Home/LimitedEdition";
import TrendingNowSection from "@/Components/Home/TrendingNowSection";
import OurStorySection from "@/Components/Home/OurStorySection";
import ContactUsSection from "@/Components/Home/ContuctUsSection";
import ProductVideoSection from "@/Components/Home/ProductVideoSection";
import CommunitySection from "@/Components/Home/CommunitySection";

export default function Home() {
  const [step, setStep] = useState("featured");
  const [slider, setSlider] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const featureProducts = data?.featured_products || [];
  const bestSellers = data?.best_selling_products || [];
  const popularProducts = data?.popular_products || [];

  useEffect(() => {
    let fetchData = async () => {
      let [res, sliderRes] = await Promise.all([
        request(`get-categories`),
        request(`sliders`),
      ]);

      setData(res);
      setSlider(sliderRes?.sliders);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClick = (value) => {
    setStep(value);
  };

  return (
    <main className="min-h-[700px]">
      {/* HERO SLIDER SECTION */}
      <HeroSection
        loading={loading}
        imageHostName={imageHostName}
        slider={slider}
      />
      {/* TRUST BADGE SECTION */}
      <TrustBadgeSection />

      {/* FEATURE SECTION */}
      <FeatureSection featureProducts={featureProducts} loading={loading} />
      {/* Category Banners */}
      <section className="grid grid-cols-1 sm:grid-cols-2">
        <CategoryBanner
          title="HAIR CARE"
          subtitle="Nourish. Strengthen. Shine."
          image="/natural-hair-care-woman-bw.png"
          bgColor="bg-gray-900"
          href="/product-list/hair-care"
        />
        <CategoryBanner
          title="SKIN CARE"
          subtitle="Hydrate. Protect. Glow."
          image="/glowing-skin-serum-bw.png"
          bgColor="bg-gray-900"
          href="/product-list/skin-care"
        />
        <CategoryBanner
          title="MAKEUP"
          subtitle="Enhance. Define. Express."
          image="/natural-makeup-bw.png"
          bgColor="bg-gray-800"
          href="/product-list/makeup"
        />
        <CategoryBanner
          title="BODY CARE"
          subtitle="Pamper. Soften. Rejuvenate."
          image="/body-care.jpg"
          bgColor="bg-gray-900"
          href="/product-list/body-care"
        />
      </section>
      {/* BEST SELLING */}
      <BestSellersSection bestSellers={bestSellers} loading={loading} />
      {/* LIMITED EDITION */}
      <LimitedEdition limitedEdition={popularProducts} />
      {/* PRODUCT VIDEO SECTION */}
      <ProductVideoSection />
      {/* TRENDING PRODUCTS */}
      <TrendingNowSection trendingProducts={featureProducts} />
      {/* OUR STORY SECTION */}
      <OurStorySection />
      {/* CONTACT US SECTION */}
      <ContactUsSection />
      {/* COMMUNITY SECTION */}
      <CommunitySection />
    </main>
  );
}
