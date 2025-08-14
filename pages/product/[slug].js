import DescriptionDetails from "@/Components/ProductDetails/DescriptionDetails";
import DetailsSection from "@/Components/ProductDetails/DetailsSection";
import ImageGallery from "@/Components/ProductDetails/ImageGallery";
import React, { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import request from "@/lib/request";
import Head from "next/head";
import { imageHostName } from "@/lib/config";
import { useRouter } from "next/router";
import ProductContentSection from "@/Components/ProductDetails/ProductContentSection";
import MoreProductSection from "@/Components/ProductDetails/MoreProductSection";

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
    <div className="overflow-hidden border-t">
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
          <div className="hidden">
            <DescriptionDetails data={data} />
          </div>
        </div>
      </div>
      {/* PRODUCT CONTENT SECTION */}
      <ProductContentSection data={data} />
      {/* RELATED PRODUCT SECTION */}
      <div>
        {/* THIS BRAND PRODUCT */}
        <MoreProductSection similarProd={similarProd} />
      </div>
    </div>
  );
};

export default ProductDetails;
