

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Link from "next/link";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import ProductCard from "../ProductDetails/ProductCard";

const Featured = ({featured}) => {
 


  return (
    <div className="relative">
      <Link href="/featured-products" className="flex justify-end mb-2 px-3">
        <button className="uppercase border border-black text-black px-3 py-2 bg-white hover:bg-black hover:text-white duration-300 text-sm">
          view all
        </button>
      </Link>
      <div className="px-3 ">
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
              slidesPerView: 1,
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
              slidesPerView: 2,
              spaceBetween: 10,
            },

            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },

            1024: {
              slidesPerView: 4,
              spaceBetween: 18,
            },

            1280: {
              slidesPerView: 4,
              spaceBetween: 18,
            },
            1440: {
              slidesPerView: 5,
              spaceBetween: 18,
            },
            1820: {
              slidesPerView: 5,
              spaceBetween: 18,
            },
            2000: {
              slidesPerView: 5,
              spaceBetween: 18,
            },
          }}
        >
          {featured?.map((item, index) => (
            <SwiperSlide key={index}>
              <ProductCard item={item} />
            </SwiperSlide>
          ))}
          <button className="button-prev-slide w-[30px] h-[30px]   grid place-items-center absolute top-[0px]  xs:right-[220px] right-[150px]   cursor-pointer">
            <MdOutlineKeyboardArrowLeft size={20} className="text-black" />
          </button>

          <button className="button-next-slide w-[30px] h-[30px]  grid place-items-center absolute top-[0px]   xs:right-[150px] right-[100px] cursor-pointer">
            <MdOutlineKeyboardArrowRight size={20} className="text-black" />
          </button>
        </Swiper>
      </div>
    </div>
  );
};

export default Featured;




