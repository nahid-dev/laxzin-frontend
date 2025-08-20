import React, { Suspense } from 'react';
import Loader from '../Loader';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";


import { Autoplay, Navigation, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import LazyImage from "../LazyImage";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

const HeroSection = ({ loading, imageHostName, slider }) => {
  return (
    <div className="relative group">
      {loading ? (
        <Loader />
      ) : (
        <Swiper
          slidesPerView={1}
          effect="fade"
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
          }}
          navigation={{
            nextEl: ".button-next-slide-hero",
            prevEl: ".button-prev-slide-hero",
          }}
          loop={true}
          modules={[Autoplay, Navigation, EffectFade]}
        >
          {slider?.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="md:h-[80vh] sm:h-[500px] xs:h-[350px] h-[200px] w-full">
                <Suspense fallback={<Loader />}>
                  <LazyImage
                    width={2000}
                    height={2000}
                    alt="slider"
                    priority
                    src={`${imageHostName}/storage/${slide?.image_path}${slide?.image}`}
                    className="h-full w-full object-fill"
                  />
                </Suspense>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {/* NAVIGATION BUTTONS */}
      <button className="button-prev-slide-hero absolute left-5 top-1/2 text-primary hidden group-hover:block z-20">
        <BsChevronCompactLeft size={48} />
      </button>
      <button className="button-next-slide-hero absolute right-5 top-1/2 text-primary hidden group-hover:block z-20">
        <BsChevronCompactRight size={48} />
      </button>
    </div>
  );
};

export default HeroSection;