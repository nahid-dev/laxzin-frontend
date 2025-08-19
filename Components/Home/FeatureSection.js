import React, { useRef, useState } from "react";
import SectionHeader from "../SectionHeader";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../ProductDetails/ProductCard";

import "swiper/css";
import "swiper/css/navigation";

const FeatureSection = ({ featureProducts, loading }) => {
  const [showPrev, setShowPrev] = useState(false);
  const swiperRef = useRef(null);

  const handleSlideChange = (swiper) => {
    setShowPrev(swiper.activeIndex > 0);
  };

  return (
    <div className="py-8 md:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-2 xl:px-0">
        <SectionHeader
          title="FEATURED COLLECTION"
          subtitle="Discover our most loved products"
        />
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="relative">
              <button
                className={`button-prev-slide text-black bg-gray-100 p-2 rounded-full border absolute -left-5 top-[40%] z-10 transition-opacity ${
                  showPrev ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <FiChevronLeft size={20} />
              </button>
              <button className="button-next-slide text-black bg-gray-100 p-2 rounded-full border absolute -right-5 top-[40%] z-10">
                <FiChevronRight size={20} />
              </button>
              <Swiper
                slidesPerView={4}
                navigation={{
                  nextEl: ".button-next-slide",
                  prevEl: ".button-prev-slide",
                }}
                loop={true}
                spaceBetween={20}
                modules={[Navigation]}
                onSlideChange={handleSlideChange}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                  setShowPrev(swiper.activeIndex > 0);
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                    spaceBetween: 12,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                  },
                }}
              >
                {featureProducts?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <ProductCard item={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
