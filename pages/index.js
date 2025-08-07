"use client";
import {
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
import { useEffect, useState } from "react";

import HighlightSection from "@/Components/Layout/HighlightSection";

import PublishedCategoryCard from "@/Components/PublishedCategoryCard";
import SectionProductList from "@/Components/SectionProductList";
import { IoSparkles } from "react-icons/io5";
import { Button } from "antd";
import { GoChevronRight } from "react-icons/go";

export default function Home() {
  const [step, setStep] = useState("featured");
  const [slider, setSlider] = useState([]);
  const [data, setData] = useState([]);
  const [isOptimizedImage, setIsOptimizedImage] = useState(true);
  const [hoveredBrand, setHoveredBrand] = useState(null);

  useEffect(() => {
    let fetchData = async () => {
      let [res, sliderRes] = await Promise.all([
        request(`get-categories`),
        request(`sliders`),
      ]);

      setData(res);

      setSlider(sliderRes?.sliders);
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
                <Image
                  width={2000}
                  height={100}
                  alt="slider"
                  priority
                  src={`${imageHostName}/storage/${slide?.image_path}${slide?.image}`}
                  className="h-full w-full object-fill"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* BRAND SECTION */}
      <div className="py-10 lg:py-24 bg-white">
        {/* Header */}
        <div className="text-center flex flex-col gap-2 md:gap-4 items-center">
          <div className="inline-flex w-fit items-center space-x-2 bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-medium">
            <IoSparkles size={18} />
            <span>Premium Beauty Collections</span>
          </div>

          <h2 className="font-medium text-primary text-2xl lg:text-4xl">
            Our Brands
          </h2>

          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4 md:px-0">
            Every Age. Every Lifestyle. We Help Everyone Be At Their Best.
            <br />
            <span className="text-sm md:text-base text-gray-500">
              Discover our curated collection of premium beauty solutions
            </span>
          </p>
        </div>

        <div className="relative pt-6 md:pt-12  brand px-4 md:px-0">
          <Swiper
            slidesPerView={6}
            spaceBetween={10}
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
                slidesPerView: 2,
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
                spaceBetween: 10,
              },

              480: {
                slidesPerView: 2,
                spaceBetween: 18,
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 18,
              },
              1150: {
                slidesPerView: 6,
                spaceBetween: 18,
              },
              1440: {
                slidesPerView: 6,
                spaceBetween: 18,
              },
              1500: {
                slidesPerView: 6,
                spaceBetween: 18,
              },
            }}
          >
            {data?.laxzin_published_category?.map((item, index) => (
              // w-[130px] h-[160px] xs:w-[60px] xs:h-[80px] xms:w-[70px] xms:h-[90px] xls:w-[80px] xls:h-[100px] sm:w-[80px] sm:h-[100px] md:w-[90px] md:h-[110px]
              <SwiperSlide
                key={index}
                // className="bg-white border rounded-lg hover:shadow-md cursor-pointer"
              >
                <Link href={`/product-list/${item?.slug}`}>
                  <div
                    className={`group relative overflow-hidden rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50 cursor-pointer transform hover:-translate-y-2 p-5`}
                    onMouseEnter={() => setHoveredBrand(item?.id)}
                    onMouseLeave={() => setHoveredBrand(null)}
                  >
                    <PublishedCategoryCard item={item} />
                    <div className="flex-1">
                      <h3
                        className={`text-lg font-medium text-gray-600 text-center group-hover:text-gray-900 transition-colors duration-300`}
                      >
                        {item?.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* BEST SELLING SECTION */}
      <div className="bg-gray-800 xs:px-6 px-2 py-4">
        <p className=" text-center uppercase text-xl text-white ">
          Best selling
        </p>

        <div className="bg-white rounded-md my-3 px-6 py-4 relative">
          <div className="flex justify-between items-center">
            <p className=" text-center uppercase text-xl text-black ">
              Best selling
            </p>
            <div>
              <Link
                href={`/all-product`}
                className="rounded-md bg-black text-white capitalize px-3 py-1"
              >
                shop all
              </Link>
            </div>
          </div>

          <div className="py-3">
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
              {data?.best_selling_products?.map((item, index) => (
                <SwiperSlide key={index}>
                  <ProductCard item={item} />
                </SwiperSlide>
              ))}
              <button className="button-prev-slide w-[30px] h-[30px]   grid place-items-center absolute top-[20px]  xs:right-[220px] right-[150px]   cursor-pointer">
                <MdOutlineKeyboardArrowLeft size={20} className="text-black" />
              </button>

              <button className="button-next-slide w-[30px] h-[30px]  grid place-items-center absolute top-[20px]   xs:right-[150px] right-[100px] cursor-pointer">
                <MdOutlineKeyboardArrowRight size={20} className="text-black" />
              </button>
            </Swiper>
          </div>
        </div>
      </div>
      {/* HOT DEALS SECTION */}
      <div className="bg-gray-100 py-4 px-6 ">
        <p className=" text-center uppercase text-2xl text-black font-semibold py-6">
          Hot deals
        </p>
        <div className="grid grid-cols-12  bg-white px-4  py-4 rounded-md mt-4">
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
        </div>
      </div>

      {/* FEATURED, POPULAR, CATEGORY SECTION */}
      <div className="bg-gray-100">
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

      <div className="bg-gray-100 ">
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
