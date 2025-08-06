import React from "react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import { BsTruck } from "react-icons/bs";
import { GoThumbsup } from "react-icons/go";
import { BiSupport } from "react-icons/bi";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { MdOutlineLocalOffer, MdOutlinePayment } from "react-icons/md";

const HighlightSection = () => {
  return (
    <div className="relative bg-gray-400 my-5 ">
      <Swiper
        slidesPerView={6}
        spaceBetween={10}
        className="border border-gray-300 rounded-md"
        autoplay={{
          delay: 2200,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".button-next-slide",
          prevEl: ".button-prev-slide",
        }}
        modules={[Autoplay, Navigation]}
        breakpoints={{
          270: {
            slidesPerView: 1.8,
            spaceBetween: 9,
          },

          320: {
            slidesPerView: 2,
            spaceBetween: 9,
          },

          375: {
            slidesPerView: 2,
            spaceBetween: 10,
          },

          425: {
            slidesPerView: 2,
            spaceBetween: 15,
          },

          480: {
            slidesPerView: 2.5,
            spaceBetween: 18,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 18,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 18,
          },
          1150: {
            slidesPerView: 4.5,
            spaceBetween: 18,
          },
          1440: {
            slidesPerView: 4.7,
            spaceBetween: 18,
          },
          1500: {
            slidesPerView: 6,
            spaceBetween: 18,
          },
        }}
      >
        <SwiperSlide>
          <div className=" flex space-x-3 border-r border-gray-300 xs:p-4 p-3">
            <div className="">
              <BsTruck className="xs:text-5xl text-3xl text-white" />
            </div>
            <div className="">
              <div className="xs:text-base text-sm font-semibold text-center text-white">
                Free Delivery
              </div>
              <div className="xs:text-base text-sm text-center">From ৳1999</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" flex space-x-3 border-r border-gray-300 xs:p-4 p-3">
            <div className="">
              <GoThumbsup className="xs:text-5xl text-3xl text-white" />
            </div>
            <div className="">
              <div className="xs:text-base text-sm font-semibold text-center text-white">
                99% Positive
              </div>
              <div className="xs:text-base text-sm text-center">Feedback</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" flex space-x-3 border-r border-gray-300 xs:p-4 p-3">
            <div className="">
              <BiSupport className="xs:text-5xl text-3xl text-white" />
            </div>
            <div className="">
              <div className="xs:text-base text-sm font-semibold text-center text-white">
                24/7 Support
              </div>
              <div className="xs:text-base text-sm text-center">shop with an expert</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" flex space-x-3 border-r border-gray-300 xs:p-4 p-3">
            <div className="">
              <FaBangladeshiTakaSign className="xs:text-5xl text-3xl text-white" />
            </div>
            <div className="">
              <div className="xs:text-base text-sm font-semibold text-center text-white">
                Affordable Price
              </div>
              <div className="xs:text-base text-sm text-center">get best price</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" flex space-x-3 border-r border-gray-300 xs:p-4 p-3">
            <div className="">
              <MdOutlinePayment className="xs:text-5xl text-3xl text-white" />
            </div>
            <div className="">
              <div className="xs:text-base text-sm font-semibold text-center text-white">
                Payment
              </div>
              <div className="xs:text-base text-sm text-center text-white">
                Secure System
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" flex space-x-3  xs:p-4 p-3 ">
            <div className="">
              <MdOutlineLocalOffer className="xs:text-5xl text-3xl text-white" />
            </div>
            <div className="">
              <div className="xs:text-base text-sm font-semibold text-center text-white">
                Only Best
              </div>
              <div className="xs:text-base text-sm text-center text-white">Brands</div>
            </div>
          </div>
        </SwiperSlide>
       
      </Swiper>
    </div>
  );
};

export default HighlightSection;
