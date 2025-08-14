import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./ProductCard";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

const MoreProductSection = ({similarProd}) => {
  return (
    <div className="pb-10">
      <div className="uppercase xs:text-2xl font-bold text-base text-center pb-8 text-black">
        More Product From this Brand
      </div>
      <div className="relative max-w-7xl mx-auto px-2 lg:px-0">
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          autoplay={{
            delay: 2200,
            disableOnInteraction: true,
          }}
          pagination={false}
          navigation={{
            nextEl: ".button-next-slide",
            prevEl: ".button-prev-slide",
          }}
          modules={[Autoplay, Navigation, Pagination]}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 9,
            },
            375: {
              slidesPerView: 2,
              spaceBetween: 9,
            },

            425: {
              slidesPerView: 2,
              spaceBetween: 9,
            },

            576: {
              slidesPerView: 3,
              spaceBetween: 10,
            },

            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },

            1024: {
              slidesPerView: 3,
              spaceBetween: 18,
            },

            1280: {
              slidesPerView: 4,
              spaceBetween: 18,
            },
            1440: {
              slidesPerView: 4,
              spaceBetween: 26,
            },
            1820: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            2000: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
        >
          {similarProd?.map((item, index) => (
            <SwiperSlide key={index}>
              <ProductCard item={item} />
            </SwiperSlide>
          ))}
          <div className="md:flex hidden">
            <button className="button-prev-slide size-10  rounded-full shadow-xl drop-shadow-lg  transition duration-200 bg-slate-50  text-black grid place-items-center absolute top-[40%] z-10 -left-5  cursor-pointer">
              <MdOutlineKeyboardArrowLeft size={24} className="text-black" />
            </button>

            <button className="button-next-slide size-10 rounded-full shadow-xl drop-shadow-lg  transition duration-200 bg-slate-50 text-black grid place-items-center absolute top-[40%] z-10 -right-5  cursor-pointer">
              <MdOutlineKeyboardArrowRight size={24} className="text-black" />
            </button>
          </div>

          <div className="md:hidden ">
            <button className="button-prev-slide   text-black  absolute top-[47%] z-10 left-[-45px]  cursor-pointer">
              <MdOutlineKeyboardArrowLeft size={24} className="text-black " />
            </button>

            <button className="button-next-slide  text-black  absolute top-[47%] z-10 right-[-45px]  cursor-pointer">
              <MdOutlineKeyboardArrowRight size={24} className="text-black" />
            </button>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default MoreProductSection;
