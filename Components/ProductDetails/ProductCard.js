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

const ProductCard = ({ item }) => {
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
    <div className="bg-white border border-gray-200 rounded-xl group flex flex-col overflow-hidden">
      <Link href={`/product/${item?.slug}`} className="relative group">
        {item?.image?.length > 0 ? (
          <div className="h-[100px] xs:h-[260px] w-full overflow-hidden">
            <Image
              width={480}
              height={480}
              src={
                isOptimizedImage
                  ? `${imageHostName}/storage/product/${encodeURIComponent(
                      item?.image[0]
                    )}`
                  : "/assets/placeholder_600x.webp"
              }
              className="rounded-t-xl object-contain h-full center-center w-full group-hover:scale-105 transition-all duration-200 ease-in-out"
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
      <div className="px-3 mb-2 flex-1">
        <div className="text-sm text-primary h-[40px] text-center mb-2">
          <p className="font-medium line-clamp-2">{item?.product_name}</p>
        </div>

        {/* {item?.laxzin_featured_status == 1 ? (
          <div className="flex justify-center mb-3 h-[30px]">
            <button className="uppercase text-xs py-1 bg-primary rounded-full px-2">
              featured
            </button>
          </div>
        ) : (
          <div className="h-[30px] mb-3"></div>
        )} */}

        <div className="text-center text-primary font-semibold">
          ৳
          {item?.product_variation_status == 0 ? (
            <>
              {item?.regular_price == item?.sale_price ? null : (
                <span className="line-through">
                  {Math.round(item?.regular_price)}
                </span>
              )}
            </>
          ) : (
            <>
              {item?.product_variants[0]?.regular_price ==
              item?.product_variants[0]?.sale_price ? null : (
                <span className="line-through">
                  {Math.round(item?.product_variants[0]?.regular_price)}
                </span>
              )}
            </>
          )}
          {item?.product_variation_status == 0 ? (
            <span className="pl-1 text-primary">
              {Math.round(item?.sale_price)}
            </span>
          ) : (
            <span className="pl-1 text-primary">
              {Math.round(item?.product_variants[0]?.sale_price)}
            </span>
          )}
        </div>
      </div>
      {/* CARD BUTTON */}
      <div className="w-full">
        <button
          className="bg-primary  py-3 text-white text-center w-full uppercase text-xs md:text-sm font-semibold rounded-b-xl flex items-center justify-center gap-3"
          onClick={() => handleCart()}
        >
          <span>
            <SlHandbag size={18} className="text-white" />
          </span>
          <span>add to cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
