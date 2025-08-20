import React, { useRef, useState } from "react";
import ProductCard from "../ProductDetails/ProductCard";
import SectionHeader from "../SectionHeader";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const LimitedEdition = ({ limitedEdition }) => {
  const [showPrev, setShowPrev] = useState(false);
  const swiperRef = useRef(null);

  const handleSlideChange = (swiper) => {
    setShowPrev(swiper.activeIndex > 0);
  };

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
      <SectionHeader
        title="SEASONAL PRODUCTS"
        subtitle="Exclusive products available for a limited time"
      />
      <div className="max-w-7xl mx-auto px-2 xl:px-0">
        <div className="grid grid-cols-2 gap-5 md:gap-10">
          <div className="relative col-span-2 sm:col-span-1">
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
              slidesPerView={2}
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
            >
              {limitedEdition?.map((item, index) => (
                <SwiperSlide key={index} className="mb-3">
                  <ProductCard item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="order-1 lg:order-2 col-span-2 sm:col-span-1">
            <Image
              src="/image/natural-ingredients-lab.png"
              height={720}
              width={720}
              alt="Our Story"
              className="w-full h-64 sm:h-96 lg:h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LimitedEdition;
