import {
  MdChevronRight,
  MdOutlineDoubleArrow,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import CategoryProd from "@/Components/Home/CategoryProd";
import Featured from "@/Components/Home/Featured";
import Popular from "@/Components/Home/Popular";
import ProductCard from "@/Components/ProductDetails/ProductCard";
import { imageHostName } from "@/lib/config";
import request from "@/lib/request";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

import HighlightSection from "@/Components/Layout/HighlightSection";

import PublishedCategoryCard from "@/Components/PublishedCategoryCard";
import SectionProductList from "@/Components/SectionProductList";
import { IoSparkles } from "react-icons/io5";
import LazyImage from "@/Components/LazyImage";
import Loader from "@/Components/Loader";
import { FaChevronRight, FaFire, FaStar } from "react-icons/fa";
import SectionHeader from "@/Components/SectionHeader";

export default function Home() {
  const [step, setStep] = useState("featured");
  const [slider, setSlider] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleClick = (value) => {
    setStep(value);
  };

  return (
    <main className="min-h-[700px]">
      {/* HERO SLIDER SECTION */}
      <div>
        {loading ? (
          <Loader />
        ) : (
          <Swiper
            slidesPerView={1}
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
          >
            {slider?.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="md:h-[700px] sm:h-[500px]  xs:h-[350px] h-[200px] w-full">
                  <Suspense fallback={<Loader />}>
                    <LazyImage
                      width={2000}
                      height={100}
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
      </div>

      {/* BRAND SECTION */}
      <div className="py-8 lg:py-12 bg-white flex flex-col gap-6">
        {/* Header */}
        <div className="text-center flex flex-col gap-1 md:gap-2 items-center">
          <div className="inline-flex w-fit items-center space-x-2 bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-xs md:text-sm font-medium">
            <IoSparkles size={18} />
            <span>Premium Beauty Collections</span>
          </div>

          <h2 className="font-medium text-primary text-xl lg:text-2xl">
            Our Categories
          </h2>

          <p className="max-w-3xl mx-auto px-4 md:px-0 text-gray-600">
            Every age. Every lifestyle. We help everyone be at their best.
          </p>
        </div>

        <div className="relative brand px-4 md:px-0">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 container mx-auto gap-5 md:gap-10">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-100 h-[150px] w-full rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <div className="relative w-full px-5 md:px-10 mx-auto">
              {/* Arrows */}
              <button className="button-prev-slide-brand size-[28px] md:size-[38px] grid place-items-center absolute top-[45%] left-0 md:left-5 cursor-pointer bg-white shadow-xl border z-30 rounded-full">
                <MdOutlineKeyboardArrowLeft size={20} className="text-black" />
              </button>

              <Swiper
                slidesPerView="auto"
                spaceBetween={20}
                loop={true}
                autoplay={{
                  delay: 2200,
                  disableOnInteraction: false,
                }}
                navigation={{
                  nextEl: ".button-next-slide-brand",
                  prevEl: ".button-prev-slide-brand",
                }}
                modules={[Autoplay, Navigation]}
                className="pl-2 pr-2"
              >
                {data?.laxzin_published_category?.map((item, index) => (
                  <SwiperSlide key={index} className="!w-fit">
                    <Link href={`/product-list/${item?.slug}`}>
                      <div className="group rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200/50 cursor-pointer transform hover:-translate-y-1 w-fit p-5 pt-0 pb-6">
                        <PublishedCategoryCard item={item} />
                        <div>
                          <h3 className="text-base md:text-lg font-medium text-gray-600 text-center group-hover:text-gray-900 transition-colors duration-300">
                            {item?.name}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>

              <button className="button-next-slide-brand size-[28px] md:size-[38px] grid place-items-center absolute top-[45%] right-0 md:right-5 cursor-pointer bg-white shadow-xl border z-30 rounded-full">
                <MdOutlineKeyboardArrowRight size={20} className="text-black" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* BEST SELLING SECTION */}
      <div className=" xs:px-6 px-2 py-8 lg:py-12 flex flex-col gap-6">
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
        <div className="bg-white rounded-xl px-6 py-4 lg:px-8 lg:py-6 relative shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="md:text-xl text-primary dark:text-white font-medium">
              Featured Collection
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                <button className="button-prev-slide p-1 md:p-1.5 rounded-md bg-gray-50 hover:bg-gray-100 transition-all duration-200 cursor-pointer">
                  <MdOutlineKeyboardArrowLeft
                    size={20}
                    className="text-primary"
                  />
                </button>

                <button className="button-next-slide p-1 md:p-1.5 rounded-md bg-gray-50 hover:bg-gray-100 transition-all duration-20 cursor-pointer">
                  <MdOutlineKeyboardArrowRight
                    size={20}
                    className="text-primary"
                  />
                </button>
              </div>
              <Link
                href={`/all-product`}
                className="rounded-md bg-primary text-white capitalize px-3 py-1 text-xs md:text-base text-nowrap font-medium hover:bg-[#383838] transition-colors duration-200"
              >
                shop all
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
                  slidesPerView: 6,
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

      {/* HOT DEALS SECTION */}
      <div className="px-6 py-8 lg:py-12">
        <SectionHeader
          title="HOT DEALS"
          helperText="Grab the best offers before they're gone!"
          icon={<FaFire size={14} className="text-orange-600" />}
          badgeTheme={{
            bgColor: "bg-orange-100",
            textColor: "text-orange-600",
          }}
          badgeText="Best Price"
        />
        <div className="bg-white rounded-xl px-6 py-4 lg:px-8 lg:py-6 relative shadow-lg mt-3 md:mt-6">
          <div className="flex items-center justify-between py-3">
            <div className="md:text-xl text-primary dark:text-white font-medium">
              {data?.section?.name}
              <span className="text-sm hidden lg:inline xl:inline xxl:inline font-medium text-gray-500 xs:text-[10px] xms:text-[10px] xls:text-[10px] sm:text-[12px] ml-2">
                {data?.section?.meta_name}
              </span>
            </div>
            <Link
              href={`/category/${data?.section?.slug}`}
              className="rounded-md bg-primary text-white capitalize px-3 py-1 text-xs md:text-base text-nowrap font-medium hover:bg-[#383838] transition-colors duration-200"
            >
              <div className="flex items-center flex-column group">
                <span className="mr-1 font-medium text-tahiti-500">
                  View All
                </span>
                <MdChevronRight size={20} className="text-white" />
              </div>
            </Link>
          </div>
          <div className="grid items-stretch grid-cols-2 gap-5">
            {/* 🔹 Left Banner */}
            <div className="col-span-2 lg:col-span-1 overflow-hidden rounded-lg">
              <div className="w-full h-full max-h-[390px]">
                <Image
                  src={`${imageHostName}/storage/${data?.section?.image_path}${data?.section?.image}`}
                  className="object-cover w-full h-full rounded-lg"
                  loading="lazy"
                  width={720}
                  height={720}
                  alt="Hot Deals Banner"
                />
              </div>
            </div>
            {/* 🔹 Right Column: 3 Product Cards beside banner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 col-span-2 lg:col-span-1">
              {data?.section?.section_product_list
                ?.slice(0, 3)
                .map((product, index) => (
                  <ProductCard key={index} item={product} />
                ))}
            </div>
          </div>
        </div>

        {/* Old data */}
        {/* <div className="grid grid-cols-12 px-4  py-4 rounded-md mt-4 border border-red-500">
          <div className="lg:col-span-8 col-span-full lg:order-1 order-2 grid xs:grid-cols-2 grid-cols-1">
            {data?.section?.section_product_list
              ?.slice(0, 4)
              .map((item, index) => (
                <Link
                  href={`/product/${item?.slug}`}
                  className="border border-gray-300 md:flex block space-x-3  p-10"
                  key={index}
                >
                  <SectionProductList item={item} />
                </Link>
              ))}
          </div>
          <div className="lg:col-span-4 col-span-full lg:order-2 order-1 h-full ">
            <Image
              src={`${imageHostName}/storage/${data?.section?.image_path}${data?.section?.image}`}
              width={500}
              height={500}
              className="object-fill w-full h-full"
              priority
              alt="banner"
              // unoptimized={!isOptimizedImage}
              // onError={() => setIsOptimizedImage(false)}
            />
          </div>
        </div> */}
      </div>

      {/* FEATURED, POPULAR, CATEGORY SECTION */}
      <div className="bg-gray-50">
        <div className=" pt-14 pb-14">
          <div>
            <div className="flex justify-center items-center space-x-8 pb-5">
              <div
                className={`uppercase xs:tracking-[5px] xs:text-lg text-sm tracking-normal  text-black pb-3 cursor-pointer ${
                  step == "featured" ? "border-b" : null
                }  border-black`}
                onClick={() => handleClick("featured")}
              >
                featured
              </div>
              <div
                className={`uppercase xs:tracking-[5px] xs:text-lg text-sm tracking-normal  text-black pb-3 cursor-pointer ${
                  step == "popular" ? "border-b" : null
                }  border-black`}
                onClick={() => handleClick("popular")}
              >
                popular
              </div>
              <div
                className={`uppercase xs:tracking-[5px] xs:text-lg text-sm tracking-normal  text-black pb-3 cursor-pointer ${
                  step == "category" ? "border-b" : null
                }  border-black`}
                onClick={() => handleClick("category")}
              >
                category
              </div>
            </div>
          </div>
          <div>
            {step == "featured" ? (
              <Featured featured={data?.featured_products} />
            ) : step == "popular" ? (
              <Popular popular={data?.popular_products} />
            ) : step == "category" ? (
              <CategoryProd
                category_prod={data?.laxzin_category?.products}
                slug={data?.laxzin_category?.slug}
              />
            ) : null}
          </div>
        </div>
      </div>

      <div className="bg-gray-100">
        {data?.laxzin_section_category?.map((item, index) => (
          <div key={index}>
            {item?.products?.length > 0 ? (
              <div className="py-3 xl:max-w-[70rem] lg:max-w-[55rem] md:max-w-[50rem] sm:max-w-[36rem] max-w-[15rem] mx-auto">
                <div className="xs:flex xxxsm:block justify-between items-center">
                  <div className="xxxsm:text-base xs:text-2xl text-black xxxsm:tracking-[2px] tracking-[5px] uppercase pb-5">
                    {item?.name}
                  </div>
                  <Link
                    href={`/product-category/${item?.slug}`}
                    className="mb-2"
                  >
                    <button className="uppercase border border-black text-black px-3 py-2 bg-white hover:bg-black hover:text-white duration-300 text-sm mb-4">
                      view all
                    </button>
                  </Link>
                </div>

                <div className="relative">
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
                        slidesPerView: 1,
                        spaceBetween: 9,
                      },

                      425: {
                        slidesPerView: 1,
                        spaceBetween: 9,
                      },

                      576: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                      },

                      768: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                      },

                      1024: {
                        slidesPerView: 3,
                        spaceBetween: 18,
                      },

                      1280: {
                        slidesPerView: 3,
                        spaceBetween: 18,
                      },
                      1440: {
                        slidesPerView: 4,
                        spaceBetween: 18,
                      },
                      1820: {
                        slidesPerView: 4,
                        spaceBetween: 18,
                      },
                      2000: {
                        slidesPerView: 4,
                        spaceBetween: 18,
                      },
                    }}
                  >
                    {item?.products?.map((item, index) => (
                      <SwiperSlide key={index}>
                        <ProductCard item={item} />
                      </SwiperSlide>
                    ))}
                    {item?.products?.length > 0 ? (
                      <div className="md:flex hidden">
                        <button className="button-prev-slide w-[30px] h-[30px]   grid place-items-center absolute top-[20px]  xs:right-[220px] right-[150px]   cursor-pointer">
                          <MdOutlineKeyboardArrowLeft
                            size={20}
                            className="text-black"
                          />
                        </button>

                        <button className="button-next-slide w-[30px] h-[30px]  grid place-items-center absolute top-[20px]   xs:right-[150px] right-[100px] cursor-pointer">
                          <MdOutlineKeyboardArrowRight
                            size={20}
                            className="text-black"
                          />
                        </button>
                      </div>
                    ) : null}

                    {item?.products?.length > 0 ? (
                      <div className="md:hidden ">
                        <button className="button-prev-slide   text-black  absolute top-[47%] z-10 left-[-45px]  cursor-pointer">
                          <MdOutlineKeyboardArrowLeft
                            size={24}
                            className="text-black "
                          />
                        </button>

                        <button className="button-next-slide  text-black  absolute top-[47%] z-10 right-[-45px]  cursor-pointer">
                          <MdOutlineKeyboardArrowRight
                            size={24}
                            className="text-black"
                          />
                        </button>
                      </div>
                    ) : null}
                  </Swiper>
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="relative py-3">
        <Swiper
          slidesPerView={1}
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
        >
          <SwiperSlide>
            <Image
              src={`${imageHostName}/storage/${data?.banner?.image_path}${data?.banner?.image}`}
              height={300}
              width={1800}
              className="w-full md:h-[500px] h-auto object-fill"
              alt="banner"
              // unoptimized={!isOptimizedImage}
              // onError={() => setIsOptimizedImage(false)}
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="bg-white py-3 px-6 ">
        <HighlightSection />
      </div>
    </main>
  );
}
