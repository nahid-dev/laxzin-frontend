import CommonbgBanner from '@/Components/Common/CommonbgBanner';
import DescriptionDetails from '@/Components/ProductDetails/DescriptionDetails';
import DetailsSection from '@/Components/ProductDetails/DetailsSection';
import ImageGallery from '@/Components/ProductDetails/ImageGallery';
import React, { useEffect, useState } from 'react'

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import ProductCard from '@/Components/ProductDetails/ProductCard';
import request from '@/lib/request';
import Head from 'next/head';
import { hostname,imageHostName } from '@/lib/config';
import { useRouter } from 'next/router';

// import { ProductJsonLd } from "next-seo";


const ProductDetails = () => {
  const [similarProd, setSimilarProd] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [variationId, setVariationId] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [clickFlag, setClickFlag] = useState(false);

  const [totalQty, setTotalQty] = useState(0);

  const [variationQty, setVariationQty] = useState(0);

  const [data, setData] = useState({});

  const router = useRouter();
  const [selectedNormalIndex, setSelectedNormalIndex] = useState(0);

  useEffect(() => {
    if (router?.query?.slug) {
      const getData = async () => {
        let res = await request(`get-product-details/${router?.query?.slug}`);

        setData(res?.data);
      };
      getData();
    }
  }, [router?.query?.slug]);

  const handleVariationImageClick = (id, index) => {
    setVariationId(id);

    setSelectedIndex(index);
    setClickFlag(true);

    setVariationQty(data?.product_variants[index]?.qty);

    setSelectedNormalIndex(null);
  };

  const handleImageClick = (index) => {
    setSelectedIndex(0);
    setClickFlag(false);
    setSelectedNormalIndex(index);
  };

  useEffect(() => {
    if (data) {
      const getData = async () => {
        const res = await request(`similar-products/${data?.id}`);

        setSimilarProd(res?.similar_products);
      };
      getData();
    }
  }, [data]);

  useEffect(() => {
    if (data?.product_variation_status == 1) {
      let dd = data?.product_variants?.reduce((a, b) => a + b?.qty, 0);
      setTotalQty(dd);
    } else {
      setTotalQty(data?.qty);
    }
  }, [data]);

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: data?.product_name,

    description: `Buy ${data?.product_name} with barcode ${data?.google_barcode}. Find the best deals.`,
    sku: data?.google_barcode,
    gtin13: data?.google_barcode,
    mpn: data?.google_barcode, // barcode or manufacturer part number
    brand: {
      "@type": "Brand",
      name: data?.product?.categoryType,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "BDT",
      price: data?.sale_price,
      availability: `${totalQty == 0 ? "out of stock" : "in stock"}`,
    },
  };

  return (
    <>
      <Head>
        <title>{`${data?.product_name}`}</title>

        <link rel="icon" href="/favicon.png" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index,follow" />
        <meta name="robots" content="all" />
        <meta name="url" content={`https://laxzin.com/product/${data?.slug}`} />
        <link
          rel="canonical"
          href={`https://laxzin.com/product/${data?.slug}`}
        />

        <meta
          name="description"
          content={`Buy ${data?.product_name} with barcode ${data?.google_barcode}. Find the best deals.`}
        />
        <meta
          property="product:availability"
          content={`${totalQty == 0 ? "out of stock" : "in stock"}`}
        />
        <meta property="og:site_name" content="Laxzin" />
        <meta property="og:title" content={`${data?.product_name}`} />
        <meta
          property="og:description"
          content={`Buy ${data?.product_name} with barcode ${data?.google_barcode}. Find the best deals.`}
        />

        <meta
          property="og:url"
          content={`https://laxzin.com/product/${data?.slug}`}
        />
        <meta property="og:type" content="product" />

        <meta property="product:condition" content="new" />
        <meta property="product:price:currency" content="BDT" />
        <meta property="product:price:amount" content={`${data?.sale_price}`} />
        <meta
          property="product:retailer_item_id"
          content={`${data?.google_barcode}`}
        />
        <meta
          property="product:item_group_id"
          content={`${data?.google_barcode}`}
        />
        {data?.image?.length > 0 ? (
          <meta
            property="og:image"
            content={`${imageHostName}/storage/product/${data?.image[0]}`}
          />
        ) : null}

        <meta
          property="og:url"
          href={`https://laxzin.com/product/${data?.slug}`}
        />
        <meta
          property="product:retailer_item_id"
          content={`${data?.google_barcode}`}
        />
        <meta property="fb:app_id" content={`${data?.google_barcode}`} />

        <meta property="og:type" content="website" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="max-w-7xl mx-auto pt-10 px-2 lg:px-0">
        <div className="grid md:grid-cols-2 grid-cols-1 pb-10 gap-5 md:gap-10">
          <div>
            <ImageGallery
              data={data}
              variationId={variationId}
              selectedIndex={selectedIndex}
              handleImageClick={handleImageClick}
              handleVariationImageClick={handleVariationImageClick}
              setSelectedIndex={setSelectedIndex}
              clickFlag={clickFlag}
              setClickFlag={setClickFlag}
              selectedNormalIndex={selectedNormalIndex}
            />
          </div>

          <div>
            <DetailsSection
              data={data}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              variationId={variationId}
              setVariationId={setVariationId}
              selectedIndex={selectedIndex}
              clickFlag={clickFlag}
              handleVariationImageClick={handleVariationImageClick}
              variationQty={variationQty}
            />
          </div>
          <div>
            <DescriptionDetails data={data} />
          </div>
        </div>

        <div className="uppercase xs:text-2xl text-base text-center pb-8 tracking-widest text-black">
          related products
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
            {similarProd?.map((item, index) => (
              <SwiperSlide key={index}>
                <ProductCard item={item} />
              </SwiperSlide>
            ))}
            <div className="md:flex hidden">
              <button className="button-prev-slide w-[60px] h-[60px]  rounded-full shadow-xl drop-shadow-lg  transition duration-200 bg-slate-50  text-black grid place-items-center absolute top-[47%] z-10 left-[-80px]  cursor-pointer">
                <MdOutlineKeyboardArrowLeft size={24} className="text-black" />
              </button>

              <button className="button-next-slide w-[60px] h-[60px] rounded-full shadow-xl drop-shadow-lg  transition duration-200 bg-slate-50 text-black grid place-items-center absolute top-[47%] z-10 right-[-80px]  cursor-pointer">
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
    </>
  );
};

export default ProductDetails;
