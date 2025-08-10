"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { FaRegCreditCard, FaRegThumbsUp } from "react-icons/fa";
import { FiAward, FiHeadphones, FiTruck } from "react-icons/fi";
import { LuTag } from "react-icons/lu";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

export default function FeaturesSection() {
  const features = [
    {
      icon: FiTruck,
      title: "Free Delivery",
      description: "From ৳1999",
    },
    {
      icon: FaRegThumbsUp,
      title: "99% Positive",
      description: "Feedback",
    },
    {
      icon: FiHeadphones,
      title: "24/7 Support",
      description: "shop with an expert",
    },
    {
      icon: LuTag,
      title: "Affordable Price",
      description: "get best price",
    },
    {
      icon: FaRegCreditCard,
      title: "Payment",
      description: "Secure System",
    },
    {
      icon: FiAward,
      title: "Only Best",
      description: "Brands",
    },
  ];

  return (
    <section className="w-full px-2 md:px-6 py-4 md:py-8 md:pb-12">
      <div className="mx-auto relative">
        {/* Left Navigation Arrow */}
        <button className="swiper-button-prev-custom size-[28px] md:size-[38px] grid place-items-center absolute top-[40%] -left-3 md:-left-5 cursor-pointer bg-white hover:bg-gray-100 shadow-xl border z-30 rounded-full">
          <MdOutlineKeyboardArrowLeft size={20} className="text-black" />
        </button>

        {/* Right Navigation Arrow */}
        <button className="swiper-button-next-custom size-[28px] md:size-[38px] grid place-items-center absolute top-[40%] -right-3 md:-right-5 cursor-pointer bg-white hover:bg-gray-100 shadow-xl border z-30 rounded-full">
          <MdOutlineKeyboardArrowRight size={20} className="text-black" />
        </button>

        <div className="">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
              // Mobile (320px and up)
              320: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              // Small tablets (480px and up)
              480: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              // Tablets (768px and up)
              768: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
              // Small laptops (1024px and up)
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              // Large screens (1280px and up)
              1280: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
              // Extra large screens (1536px and up)
              1536: {
                slidesPerView: 6,
                spaceBetween: 30,
              },
            }}
            className="features-swiper"
          >
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <SwiperSlide key={index}>
                  <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-slate-200 h-full">
                    <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-800 text-base mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .features-swiper .swiper-slide {
          height: auto;
          display: flex;
        }

        .features-swiper .swiper-slide > div {
          width: 100%;
        }

        // @media (max-width: 768px) {
        //   .swiper-button-prev-custom,
        //   .swiper-button-next-custom {
        //     width: 10px;
        //     height: 10px;
        //   }

        //   .swiper-button-prev-custom svg,
        //   .swiper-button-next-custom svg {
        //     width: 4px;
        //     height: 4px;
        //   }
        // }
      `}</style>
    </section>
  );
}
