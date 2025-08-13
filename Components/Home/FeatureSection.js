import React from "react";
import SectionHeader from "../SectionHeader";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../ProductDetails/ProductCard";

const FeatureSection = ({ featureProducts, loading }) => {
  return (
    <div className="py-8 md:py-12 lg:py-24">
      <div className="max-w-7xl mx-auto px-2 xl:px-0">
        <SectionHeader
          title="FEATURED COLLECTION"
          subtitle="Discover our most loved products"
        />
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
              {featureProducts?.slice(0, 4)?.map((item, index) => (
                <SwiperSlide key={index}>
                  <ProductCard item={item} />
                </SwiperSlide>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
