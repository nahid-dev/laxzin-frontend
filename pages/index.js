import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { imageHostName } from "@/lib/config";
import request from "@/lib/request";

import { useEffect, useState } from "react";
import TrustBadgeSection from "@/Components/TrustBadgeSection";

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
import SkinTypeSection from "@/Components/Home/SkinTypeSection";
import { skinTypes } from "@/options";

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

  return (
    <main className="min-h-[700px]">
      {/* HERO SLIDER SECTION */}
      <HeroSection
        loading={loading}
        imageHostName={imageHostName}
        slider={slider}
      />
      {/* SKIN TYPE SECTION */}
      <SkinTypeSection
        secTitle={"Skin Type"}
        secDesc={"Find products perfect for your unique skin needs"}
        data={skinTypes}
      />
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
      {/* YOUR CONCERN SECTION */}
      <SkinTypeSection
        secTitle={"Your Concern"}
        secDesc={"Find products perfect for your concern skin type"}
        data={skinTypes}
      />
      {/* CONTACT US SECTION */}
      <ContactUsSection />
      {/* TRUST BADGE SECTION */}
      <TrustBadgeSection />
      {/* COMMUNITY SECTION */}
      <CommunitySection />
    </main>
  );
}
