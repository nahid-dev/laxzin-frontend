import React, { useState } from "react";
import { LuEye } from "react-icons/lu";
import { CiHeart } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import { imageHostName } from "@/lib/config";
import { toast } from "react-toastify";
import { useStatus } from "@/context/contextStatus";
import { setCookie } from "nookies";
import { useRouter } from "next/router";
import PlaceholderImage from "@/public/image/placeholder_600x.webp";
import { SlHandbag } from "react-icons/sl";

const sizeClasses = {
  small: "h-64 sm:h-72",
  default: "h-72 sm:h-80",
  large: "h-80 sm:h-96",
};

const ProductCard = ({
  item,
  showBadge = false,
  showTrend = false,
  size = "default",
}) => {
  const [count, setCount] = useState(1);
  const { cartItems, setCartItems, setIsCartOpen } = useStatus();
  const router = useRouter();
  const [isOptimizedImage, setIsOptimizedImage] = useState(true);

  const handleCart = () => {
    if (item?.product_variation_status == 0) {
      let obj = {
        product_id: item?.id,
        slug: item?.slug,
        variant_id: null,
        name: item?.product_name,
        image: item?.image[0],
        regularPrice: item?.regular_price,
        sellingPrice: item?.sale_price,
        quantity: count,
        variations: null,
        stock: item?.stock_products[0]?.total,
        discount: item?.discount,
        sale_unit_id: item?.unit_id,
        discount_type: item?.discount_type,
      };

      const is_exist = cartItems.find(
        (variation) => variation.product_id == obj.product_id
      );

      if (is_exist) {
        const index = cartItems.findIndex(
          (variation) => variation?.product_id == is_exist.product_id
        );

        if (
          cartItems[index].quantity + obj?.quantity <=
          item?.stock_products[0]?.total
        ) {
          cartItems[index].quantity += count;

          setCartItems(cartItems);
          setCookie(null, "lexzinCart", JSON.stringify(cartItems), {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });
          setIsCartOpen(true);
        } else {
          toast.error("You cant add more products");
        }
      }

      if (is_exist === undefined) {
        if (item?.stock_products[0]?.total > 0) {
          setCartItems((cartItems) => [...cartItems, obj]);
          setCookie(null, "lexzinCart", JSON.stringify([...cartItems, obj]), {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });

          setIsCartOpen(true);
        } else {
          toast.error("Out of stock");
        }
      }
    } else {
      router.push(`/product/${item?.slug}`);
    }
  };

  return (
    <div className="group">
      <div className="rounded-b-none flex flex-col overflow-hidden">
        <Link href={`/product/${item?.slug}`} className="relative group">
          {item?.image?.length > 0 ? (
            <div
              className={`h-72 xs:h-80 overflow-hidden rounded-xl ${sizeClasses[size]} relative`}
            >
              {showBadge && item?.badge && (
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10">
                  <span className="bg-black text-white px-2 sm:px-3 py-1 text-xs tracking-[0.1em] font-medium">
                    {item?.badge}
                  </span>
                </div>
              )}
              {showTrend && (
                <div className="absolute top-2 right-2 z-10">
                  <span className="bg-green-500 text-white px-2 py-1 text-xs rounded-full font-medium">
                    {/* {item?.trend} */} ↗ 29%
                  </span>
                </div>
              )}
              <Image
                width={480}
                height={480}
                // src={
                //   isOptimizedImage
                //     ? `${imageHostName}/storage/product/${encodeURIComponent(
                //         item?.image[0]
                //       )}`
                //     : "/image/placeholder.png"
                // }
                src="/image/product/vitamin-c-serum.png"
                className="object-cover h-full center-center w-full group-hover:scale-105 transition-all duration-200 ease-in-out"
                unoptimized={!isOptimizedImage}
                priority={false}
                onError={() => setIsOptimizedImage(false)}
                alt="Product Image"
              />
            </div>
          ) : (
            <div className="xs:h-[300px] h-[200px]">
              <Image
                width={200}
                height={50}
                src={PlaceholderImage}
                className=" rounded-t-xl h-full w-full object-contain"
              />
            </div>
          )}
        </Link>
        {/* CARD CONTENT */}
        <div className="flex-1 mt-1">
          <div className="text-sm text-primary h-[40px]  mb-2">
            <p
              className={`font-medium text-gray-900 my-2 leading-none ${
                size === "small" ? "text-base" : "text-lg"
              } line-clamp-2`}
            >
              {item?.product_name}
            </p>
          </div>

          {item?.category && (
            <p className="text-sm text-gray-500 mb-2">{item?.category}</p>
          )}

          {/* {item?.laxzin_featured_status == 1 ? (
          <div className="flex justify-center mb-3 h-[30px]">
            <button className="uppercase text-xs py-1 bg-primary rounded-full px-2">
              featured
            </button>
          </div>
        ) : (
          <div className="h-[30px] mb-3"></div>
        )} */}

          <div
            className={`font-semibold text-black space-x-2 mb-2 md:mb-3 ${
              size === "small" ? "text-lg" : "text-xl"
            }`}
          >
            ৳
            {item?.product_variation_status == 0 ? (
              <span className="pl-1 text-primary">
                {Math.round(item?.sale_price)}
              </span>
            ) : (
              <span className="pl-1 text-primary">
                {Math.round(item?.product_variants[0]?.sale_price)}
              </span>
            )}
            {/* discount */}
            {item?.product_variation_status == 0 ? (
              <>
                {item?.regular_price == item?.sale_price ? null : (
                  <span className="line-through text-gray-600 font-normal text-sm">
                    ৳ {Math.round(item?.regular_price)}
                  </span>
                )}
              </>
            ) : (
              <>
                {item?.product_variants[0]?.regular_price ==
                item?.product_variants[0]?.sale_price ? null : (
                  <span className="line-through text-sm font-normal">
                    ৳ {Math.round(item?.product_variants[0]?.regular_price)}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {/* CARD BUTTON */}
      <div className="w-full">
        <button
          className={`bg-primary text-white text-center w-full uppercase md:text-sm tracking-[0.1em] hover:bg-gray-700 ${
            size === "small"
              ? "py-2 px-4 text-xs"
              : "py-2 xs:py-3 px-3 xs:px-6 text-sm"
          }`}
          onClick={() => handleCart()}
        >
          {showBadge ? (
            "SHOP LIMITED EDITION"
          ) : (
            <div className="flex items-center justify-center gap-3">
              <span>
                <SlHandbag size={18} className="text-white" />
              </span>
              <span>add to cart</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
