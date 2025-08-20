import { useRef, useState } from "react";
import SectionHeader from "../SectionHeader";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const skinTypes = [
  {
    id: "normal",
    title: "Normal Skin",
    image: "/image/woman-balanced-skin.png",
    description: "Balanced, clear, and not overly sensitive",
  },
  {
    id: "dry",
    title: "Dry Skin",
    image: "/image/woman-balanced-skin.png",
    description: "Tight, flaky, and needs extra moisture",
  },
  {
    id: "oily",
    title: "Oily Skin",
    image: "/image/woman-balanced-skin.png",
    description: "Shiny, enlarged pores, prone to breakouts",
  },
  {
    id: "sensitive",
    title: "Sensitive Skin",
    image: "/image/woman-balanced-skin.png",
    description: "Easily irritated, reactive to products",
  },
  {
    id: "combination",
    title: "Combination Skin",
    image: "/image/woman-balanced-skin.png",
    description: "Oily T-zone, dry or normal cheeks",
  },
  {
    id: "all",
    title: "All Skin Type",
    image: "/image/woman-balanced-skin.png",
    description: "Universal products for every skin type",
  },
];

export default function SkinTypeSection() {
  const [showPrev, setShowPrev] = useState(false);
  const swiperRef = useRef(null);
  const handleSlideChange = (swiper) => {
    setShowPrev(swiper.activeIndex > 0);
  };

  return (
    <section className="pt-8 sm:pt-10 md:pt-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="SKIN TYPE"
          subtitle="Find products perfect for your unique skin needs"
        />

        <div className="relative">
          <button
            className={`button-prev-slide-skin text-black bg-gray-100 p-2 rounded-full border absolute -left-5 top-[40%] z-10 transition-opacity ${
              showPrev ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <FiChevronLeft size={20} />
          </button>
          <button className="button-next-slide-skin text-black bg-gray-100 p-2 rounded-full border absolute -right-5 top-[40%] z-10">
            <FiChevronRight size={20} />
          </button>
          <Swiper
            slidesPerView={2}
            navigation={{
              nextEl: ".button-next-slide-skin",
              prevEl: ".button-prev-slide-skin",
            }}
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
                slidesPerView: 6,
                spaceBetween: 20,
              },
            }}
          >
            {skinTypes.map((type, i) => (
              <SwiperSlide key={i}>
                <div
                  key={type.id}
                  className={`group cursor-pointer transition-all duration-300 mb-8`}
                  onClick={() => {}}
                >
                  <div className="bg-white rounded-2xl border border-gray-300 hover:border-black hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="aspect-square p-4">
                      <Image
                        src={type.image || "/image/placeholder.png"}
                        alt={type.title}
                        height={480}
                        width={480}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-medium text-gray-900 text-sm tracking-wide">
                        {type.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
