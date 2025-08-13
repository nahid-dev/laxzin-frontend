import {
  MdChevronRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import ProductCard from "@/Components/ProductDetails/ProductCard";
import { imageHostName } from "@/lib/config";
import request from "@/lib/request";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import PublishedCategoryCard from "@/Components/PublishedCategoryCard";
import { IoSparkles } from "react-icons/io5";
import { FaBolt, FaLeaf, FaStar, FaTags, FaThLarge } from "react-icons/fa";
import SectionHeader from "@/Components/SectionHeader";
import SlideSectionHeader from "@/Components/SlideSectionHeader";
import TrustBadgeSection from "@/Components/TrustBadgeSection";
import { dummyData, skinCareData } from "@/options";

import CountdownBox from "@/Components/CountdownBox";
import SectionSubHeader from "@/Components/SectionSubHeader";
import HeroSection from "@/Components/Home/HeroSection";
import FeatureSection from "@/Components/Home/FeatureSection";
import CategoryBanner from "@/Components/Home/CategoryBanner";
import BestSellersSection from "@/Components/Home/BestSellersSection";
import LimitedEdition from "@/Components/Home/LimitedEdition";
import TrendingNowSection from "@/Components/Home/TrendingNowSection";
import OurStorySection from "@/Components/Home/OurStorySection";
import ContactUsSection from "@/Components/Home/ContuctUsSection";

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

  const handleClick = (value) => {
    setStep(value);
  };

  return (
    <main className="min-h-[700px]">
      {/* HERO SLIDER SECTION */}
      <HeroSection
        loading={loading}
        imageHostName={imageHostName}
        slider={slider}
      />
      {/* TRUST BADGE SECTION */}
      <TrustBadgeSection />
      {/* FEATURE SECTION */}
      <FeatureSection featureProducts={featureProducts} loading={loading} />
      {/* Category Banners */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <CategoryBanner
          title="HAIR CARE"
          subtitle="Nourish. Strengthen. Shine."
          image="/natural-hair-care-woman-bw.png"
          bgColor="bg-black"
        />
        <CategoryBanner
          title="SKIN CARE"
          subtitle="Hydrate. Protect. Glow."
          image="/glowing-skin-serum-bw.png"
          bgColor="bg-gray-900"
        />
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <CategoryBanner
          title="MAKEUP"
          subtitle="Enhance. Define. Express."
          image="/natural-makeup-bw.png"
          bgColor="bg-gray-800"
        />
        <CategoryBanner
          title="BODY CARE"
          subtitle="Pamper. Soften. Rejuvenate."
          image="/image/placeholder.png"
          bgColor="bg-gray-700"
        />
      </section>
      {/* BEST SELLING */}
      <BestSellersSection bestSellers={bestSellers} loading={loading} />
      {/* LIMITED EDITION */}
      <LimitedEdition limitedEdition={popularProducts} />
      {/* TRENDING PRODUCTS */}
      <TrendingNowSection trendingProducts={featureProducts} />
      {/* OUR STORY SECTION */}
      <OurStorySection />
      {/* CONTACT US SECTION */}
      <ContactUsSection />

      {/* FLASH DEAL */}
      <div className=" px-2 xs:px-6  py-4 flex flex-col gap-4 hidden">
        {/* HEADER */}
        <SectionHeader
          title="Flash Deal"
          helperText="Limited time offers – grab them before they're gone!"
          icon={<FaBolt size={14} className="text-red-600" />} // bolt = speed/urgency
          badgeTheme={{
            bgColor: "bg-red-100",
            textColor: "text-red-600",
          }}
          badgeText="Hurry Up!"
        />

        {/* CONTENT */}
        <div className="bg-white rounded-xl p-2 md:p-4 relative shadow  max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-center">
            <SectionSubHeader
              title="Flash Deals"
              helperText="Hurry, deals end soon"
            />
            {isMounted && <CountdownBox endDate="2025-08-30T23:59:59" />}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                <button className="button-prev-slide-flash p-1 md:p-1.5 rounded-md bg-gray-50 hover:bg-gray-100 transition-all duration-200 cursor-pointer">
                  <MdOutlineKeyboardArrowLeft
                    size={20}
                    className="text-primary"
                  />
                </button>

                <button className="button-next-slide-flash p-1 md:p-1.5 rounded-md bg-gray-50 hover:bg-gray-100 transition-all duration-20 cursor-pointer">
                  <MdOutlineKeyboardArrowRight
                    size={20}
                    className="text-primary"
                  />
                </button>
              </div>
              <Link
                href={`/flash-deals`}
                className="rounded-md bg-primary text-white capitalize px-3 py-1 text-xs md:text-base text-nowrap font-medium hover:bg-[#383838] transition-colors duration-200 flex items-center gap-1"
              >
                View all
                <MdChevronRight
                  size={20}
                  className="text-white hidden md:block"
                />
              </Link>
            </div>
          </div>

          {/* SWIPER SLIDER FOR BEST SELLING PRODUCTS */}
          <div className="pt-3 md:pt-6">
            <Swiper
              slidesPerView={4}
              spaceBetween={20}
              autoplay={{
                delay: 2200,
                disableOnInteraction: true,
              }}
              pagination={false}
              navigation={{
                nextEl: ".button-next-slide-flash",
                prevEl: ".button-prev-slide-flash",
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
                  slidesPerView: 6,
                  spaceBetween: 18,
                },
              }}
            >
              {data?.best_selling_products?.map((item, index) => (
                <SwiperSlide key={index}>
                  <ProductCard item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* SKIN CARE SECTION */}
      <div className="px-2 md:px-4 py-4 md:py-8 relative brand  max-w-7xl mx-auto w-full bg-white shadow rounded-xl hidden hidden">
        <SectionSubHeader
          title="Skin Type"
          helperText="Choose your skin type"
        />
        <div className="relative w-full px-5 md:px-10 mx-auto">
          {/* Arrows */}
          <button className="button-prev-slide-skin size-[28px] md:size-[38px] grid place-items-center absolute top-[45%] left-0 md:left-5 cursor-pointer bg-white shadow-xl border z-30 rounded-full">
            <MdOutlineKeyboardArrowLeft size={20} className="text-black" />
          </button>

          <Swiper
            slidesPerView="auto"
            spaceBetween={20}
            loop={true}
            autoplay={{
              delay: 2300,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".button-next-slide-skin",
              prevEl: ".button-prev-slide-skin",
            }}
            modules={[Autoplay, Navigation]}
            className="pl-2 pr-2"
          >
            {skinCareData?.map((item, index) => (
              <SwiperSlide key={index} className="!w-fit">
                <Link href="#">
                  <div className="group rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200/50 cursor-pointer transform hover:-translate-y-1 w-fit p-3 pt-0 bg-white">
                    <div className="my-2 relative md:h-[100px] md:w-[120px] sm:w-[90px] sm:h-[100px] w-[70px] h-[50px] mx-auto">
                      <Image
                        className="h-full w-full object-contain"
                        src={item?.image || "/assets/placeholder_600x.webp"}
                        width={250}
                        height={250}
                        alt="Skin Care"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm md:text-base font-semibold text-gray-600 text-center group-hover:text-gray-900 transition-colors duration-300">
                        {item?.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="button-next-slide-skin size-[28px] md:size-[38px] grid place-items-center absolute top-[45%] right-0 md:right-5 cursor-pointer bg-white shadow-xl border z-30 rounded-full">
            <MdOutlineKeyboardArrowRight size={20} className="text-black" />
          </button>
        </div>
      </div>

      {/* NEW ARRIVAL */}
      <div className="px-2 xs:px-6  py-4 flex flex-col gap-4 hidden">
        {/* HEADER */}
        <SectionHeader
          title="New Arrivals"
          helperText="Check out the latest products in our collection"
          icon={<FaLeaf size={14} className="text-emerald-600" />} // leaf = fresh/new
          badgeTheme={{
            bgColor: "bg-emerald-100",
            textColor: "text-emerald-600",
          }}
          badgeText="Just In"
        />

        {/* CONTENT */}
        <div className="bg-white rounded-xl p-2 md:p-4 relative shadow  max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-center">
            <SectionSubHeader
              title="New Collection"
              helperText="Check out the latest products in our collection"
            />
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                <button className="button-prev-slide-new p-1 md:p-1.5 rounded-md bg-gray-50 hover:bg-gray-100 transition-all duration-200 cursor-pointer">
                  <MdOutlineKeyboardArrowLeft
                    size={20}
                    className="text-primary"
                  />
                </button>

                <button className="button-next-slide-new p-1 md:p-1.5 rounded-md bg-gray-50 hover:bg-gray-100 transition-all duration-20 cursor-pointer">
                  <MdOutlineKeyboardArrowRight
                    size={20}
                    className="text-primary"
                  />
                </button>
              </div>
              <Link
                href={`/all-product`}
                className="rounded-md bg-primary text-white capitalize px-3 py-1 text-xs md:text-base text-nowrap font-medium hover:bg-[#383838] transition-colors duration-200 flex items-center gap-1"
              >
                View all
                <MdChevronRight
                  size={20}
                  className="text-white hidden md:block"
                />
              </Link>
            </div>
          </div>

          {/* SWIPER SLIDER FOR BEST SELLING PRODUCTS */}
          <div className="pt-3 md:pt-4">
            <Swiper
              slidesPerView={4}
              spaceBetween={20}
              autoplay={{
                delay: 2000,
                disableOnInteraction: true,
              }}
              pagination={false}
              navigation={{
                nextEl: ".button-next-slide-new",
                prevEl: ".button-prev-slide-new",
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
                  slidesPerView: 6,
                  spaceBetween: 18,
                },
              }}
            >
              {data?.best_selling_products?.map((item, index) => (
                <SwiperSlide key={index}>
                  <ProductCard item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* CATEGORY 1 */}
      <div className="px-2 xs:px-6 py-4 md:py-8 flex flex-col gap-10 hidden">
        {dummyData?.slice(0, 1)?.map((item, index) => (
          <div key={index}>
            {item?.products?.length > 0 ? (
              <div className="bg-white rounded-xl p-2 md:p-4 relative shadow max-w-7xl mx-auto w-full">
                <SlideSectionHeader
                  title={item?.name}
                  arrowLeft={`button-prev-slide-${item?.slug}`}
                  arrowRight={`button-next-slide-${item?.slug}`}
                  btnLink={`/product-category/${item?.slug}`}
                  btnText="View All"
                />
                <div className="grid items-stretch grid-cols-2 gap-5 md:gap-5 mt-4">
                  <div className="w-full h-full max-h-[390px] col-span-2 lg:col-span-1 overflow-hidden rounded-lg">
                    <Image
                      src={`${imageHostName}/storage/${data?.banner?.image_path}${data?.banner?.image}`}
                      className="object-cover w-full h-full rounded-lg"
                      loading="lazy"
                      width={720}
                      height={720}
                      alt="Hot Deals Banner"
                    />
                  </div>
                  <div className="col-span-2 lg:col-span-1 relative">
                    <Swiper
                      slidesPerView={3}
                      spaceBetween={20}
                      autoplay={{
                        delay: index * 100 + 1800,
                        disableOnInteraction: true,
                      }}
                      pagination={false}
                      navigation={{
                        nextEl: `.button-next-slide-${item?.slug}`,
                        prevEl: `.button-prev-slide-${item?.slug}`,
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
                      }}
                    >
                      {item?.products?.map((item, index) => (
                        <SwiperSlide key={index}>
                          <ProductCard item={item} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {/* BEST SELLING SECTION */}
      <div className="px-2 xs:px-6  py-4 lg:pt-0 flex flex-col gap-4 hidden">
        {/* HEADER */}
        <SectionHeader
          title="Best Selling Products"
          helperText="Discover our most popular skincare essentials loved by thousands of customers"
          icon={<FaStar size={14} className="text-blue-600" />}
          badgeTheme={{
            bgColor: "bg-blue-100",
            textColor: "text-blue-600",
          }}
          badgeText="Customer Favorites"
        />
        {/* CONTENT */}
        <div className="bg-white rounded-xl p-2 md:p-4 relative shadow  max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-center">
            <SectionSubHeader
              title="Best Selling Products"
              helperText="Our most-loved skincare essentials"
            />
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                <button className="button-prev-slide-best p-1 md:p-1.5 rounded-md bg-gray-50 hover:bg-gray-100 transition-all duration-200 cursor-pointer">
                  <MdOutlineKeyboardArrowLeft
                    size={20}
                    className="text-primary"
                  />
                </button>

                <button className="button-next-slide-best p-1 md:p-1.5 rounded-md bg-gray-50 hover:bg-gray-100 transition-all duration-20 cursor-pointer">
                  <MdOutlineKeyboardArrowRight
                    size={20}
                    className="text-primary"
                  />
                </button>
              </div>
              <Link
                href={`/all-product`}
                className="rounded-md bg-primary text-white capitalize px-3 py-1 text-xs md:text-base text-nowrap font-medium hover:bg-[#383838] transition-colors duration-200 flex items-center gap-1"
              >
                View all
                <MdChevronRight
                  size={20}
                  className="text-white hidden md:block"
                />
              </Link>
            </div>
          </div>

          {/* SWIPER SLIDER FOR BEST SELLING PRODUCTS */}
          <div className="pt-3 md:pt-4">
            <Swiper
              slidesPerView={4}
              spaceBetween={20}
              autoplay={{
                delay: 1800,
                disableOnInteraction: true,
              }}
              pagination={false}
              navigation={{
                nextEl: ".button-next-slide-best",
                prevEl: ".button-prev-slide-best",
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
                  slidesPerView: 6,
                  spaceBetween: 18,
                },
              }}
            >
              {data?.best_selling_products?.map((item, index) => (
                <SwiperSlide key={index}>
                  <ProductCard item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* CATEGORY 2 */}
      <div className="px-2 xs:px-6 py-4 md:py-8 flex flex-col gap-10 hidden">
        {dummyData?.slice(1, 2)?.map((item, index) => (
          <div key={index}>
            {item?.products?.length > 0 ? (
              <div className="bg-white rounded-xl p-2 md:p-4 relative shadow max-w-7xl mx-auto w-full">
                <SlideSectionHeader
                  title={item?.name}
                  arrowLeft={`button-prev-slide-${item?.slug}`}
                  arrowRight={`button-next-slide-${item?.slug}`}
                  btnLink={`/product-category/${item?.slug}`}
                  btnText="View All"
                />
                <div className="grid items-stretch grid-cols-2 gap-5 md:gap-5 mt-4">
                  <div className="w-full h-full max-h-[390px] col-span-2 lg:col-span-1 overflow-hidden rounded-lg">
                    <Image
                      src={`${imageHostName}/storage/${data?.banner?.image_path}${data?.banner?.image}`}
                      className="object-cover w-full h-full rounded-lg"
                      loading="lazy"
                      width={720}
                      height={720}
                      alt="Hot Deals Banner"
                    />
                  </div>
                  <div className="col-span-2 lg:col-span-1 relative">
                    <Swiper
                      slidesPerView={3}
                      spaceBetween={20}
                      autoplay={{
                        delay: index * 100 + 1800,
                        disableOnInteraction: true,
                      }}
                      pagination={false}
                      navigation={{
                        nextEl: `.button-next-slide-${item?.slug}`,
                        prevEl: `.button-prev-slide-${item?.slug}`,
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
                      }}
                    >
                      {item?.products?.map((item, index) => (
                        <SwiperSlide key={index}>
                          <ProductCard item={item} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {/* CATEGORY SECTION */}
      <div className="px-2 xs:px-6 py-4 md:py-0 flex flex-col gap-4 hidden">
        <SectionHeader
          title="All Categories"
          helperText="Explore our full range of product categories"
          icon={<FaThLarge size={14} className="text-indigo-600" />} // grid = categories overview
          badgeTheme={{
            bgColor: "bg-indigo-100",
            textColor: "text-indigo-600",
          }}
          badgeText="Categories"
        />

        {/* TAB & DESKTOP VIEW */}
        <div className="hidden md:block bg-white rounded-xl p-2 md:p-4 relative shadow max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-center">
            <SectionSubHeader
              title="All Categories Products"
              helperText="Explore our full range of product categories"
            />
            <Link
              href={`/all-product`}
              className="rounded-md bg-primary text-white capitalize px-3 py-1 text-xs md:text-base text-nowrap font-medium hover:bg-[#383838] transition-colors duration-200 flex items-center gap-1"
            >
              View all
              <MdChevronRight
                size={20}
                className="text-white hidden md:block"
              />
            </Link>
          </div>
          <div className="pt-3 md:pt-4 grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {data?.laxzin_category?.products
              ?.slice(0, 10)
              ?.map((item, index) => (
                <ProductCard key={index} item={item} />
              ))}
          </div>
        </div>
        {/* MOBILE VIEW */}
        <div className="md:hidden bg-white rounded-xl p-2 md:p-4 relative shadow-lg">
          <SlideSectionHeader
            title="Category Products"
            arrowLeft="button-prev-slide-category"
            arrowRight="button-next-slide-category"
            btnLink={`/product-category/${data?.laxzin_category?.slug}`}
            btnText="View All"
            isDisableSlide={false}
          />
          <div className="pt-3 md:pt-6">
            <Swiper
              slidesPerView={4}
              spaceBetween={20}
              autoplay={{
                delay: 2200,
                disableOnInteraction: true,
              }}
              pagination={false}
              navigation={{
                nextEl: ".button-next-slide-featured",
                prevEl: ".button-prev-slide-featured",
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
                  slidesPerView: 6,
                  spaceBetween: 18,
                },
                2000: {
                  slidesPerView: 6,
                  spaceBetween: 18,
                },
              }}
            >
              {data?.laxzin_category?.products?.map((item, index) => (
                <SwiperSlide key={index}>
                  <ProductCard item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* CATEGORY 3 AND OTHERS */}
      <div className="px-2 xs:px-6 py-4 md:py-8 flex flex-col gap-10 hidden">
        {dummyData?.slice(2)?.map((item, index) => (
          <div key={index}>
            {item?.products?.length > 0 ? (
              <div className="bg-white rounded-xl p-2 md:p-4 relative shadow max-w-7xl mx-auto w-full">
                <SlideSectionHeader
                  title={item?.name}
                  arrowLeft={`button-prev-slide-${item?.slug}`}
                  arrowRight={`button-next-slide-${item?.slug}`}
                  btnLink={`/product-category/${item?.slug}`}
                  btnText="View All"
                />
                <div className="grid items-stretch grid-cols-2 gap-5 md:gap-5 mt-4">
                  <div className="w-full h-full max-h-[390px] col-span-2 lg:col-span-1 overflow-hidden rounded-lg">
                    <Image
                      src={`${imageHostName}/storage/${data?.banner?.image_path}${data?.banner?.image}`}
                      className="object-cover w-full h-full rounded-lg"
                      loading="lazy"
                      width={720}
                      height={720}
                      alt="Hot Deals Banner"
                    />
                  </div>
                  <div className="col-span-2 lg:col-span-1 relative">
                    <Swiper
                      slidesPerView={3}
                      spaceBetween={20}
                      autoplay={{
                        delay: index * 100 + 1800,
                        disableOnInteraction: true,
                      }}
                      pagination={false}
                      navigation={{
                        nextEl: `.button-next-slide-${item?.slug}`,
                        prevEl: `.button-prev-slide-${item?.slug}`,
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
                      }}
                    >
                      {item?.products?.map((item, index) => (
                        <SwiperSlide key={index}>
                          <ProductCard item={item} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>
      {/* CONTACT US SECTION */}
      <div className="max-w-7xl mx-auto hidden">
        <Image
          src={`https://admin.parisbeautybd.com/storage/banner/1754735292.png`}
          className="object-cover w-full h-full rounded-lg"
          loading="lazy"
          width={1280}
          height={720}
          alt="Contact Us Banner"
        />
      </div>
    </main>
  );
}
