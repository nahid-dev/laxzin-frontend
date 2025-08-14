import { useStatus } from "@/context/contextStatus";
import { imageHostName } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsBagCheck, BsInfoCircleFill } from "react-icons/bs";

import { toast } from "react-toastify";
import ProductBenefits from "./ProductBenefits";
import Button from "../Common/Button";
import { BiLogoPlayStore } from "react-icons/bi";
import DeliveryInfoSection from "./DeliveryInfoSection";

const Details = ({
  data,
  selectedItem,

  variationId,

  selectedIndex,
  clickFlag,
  handleVariationImageClick,
  variationQty,
}) => {
  const originUrl =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  const router = useRouter();
  const [count, setCount] = useState(1);

  const {
    cartItems,
    setCartItems,
    setIsCartOpen,
    contactInfo,
    setProdId,
    setId,
    setRequestStockModal,
  } = useStatus();
  const [selectVariation, setSelectVariation] = useState(null);
  const [totalQty, setTotalQty] = useState(null);
  const [refreshWish, setrefreshWish] = useState(false);

  const isDevelopment = process.env.NEXT_PUBLIC_MODE === "development";

  const handleCart = (variation) => {
    if (
      (data?.product_variation_status == 1 && clickFlag == true) ||
      data?.product_variation_status == 0
    ) {
      let item = {
        product_id: data?.id,
        slug: data?.slug,
        variant_id: data?.product_variation_status == 1 ? variationId : null,
        name: data?.product_name,
        image:
          data?.product_variation_status == 1
            ? data?.product_variants[selectedIndex]?.image[0]
            : data?.image[0],
        regularPrice:
          data?.product_variation_status == 1
            ? data?.product_variants[selectedIndex]?.regular_price
            : data?.regular_price,
        sellingPrice:
          data?.product_variation_status == 1
            ? data?.product_variants[selectedIndex]?.sale_price
            : data?.sale_price,
        quantity: count,
        variations:
          data?.product_variation_status == 1 && variationId
            ? data?.product_variants[selectedIndex]?.product_variant_name
            : null,
        stock:
          data?.product_variation_status == 1
            ? data?.product_variants[selectedIndex]?.qty
            : data?.qty,
        discount:
          data?.product_variation_status == 1
            ? data?.product_variants[selectedIndex]?.discount
            : data?.discount,
        sale_unit_id: data?.unit_id,
        discount_type:
          data?.product_variation_status == 1
            ? data?.product_variants[selectedIndex]?.discount_type
            : data?.discount_type,
      };

      const is_exist = cartItems.find(
        (variation) =>
          variation.product_id == item.product_id &&
          variation.variant_id == item.variant_id
      );

      if (is_exist) {
        const index = cartItems.findIndex(
          (variation) =>
            variation?.product_id == is_exist.product_id &&
            variation.variant_id == is_exist.variant_id
        );

        if (data?.product_variation_status == 1) {
          if (
            cartItems[index].quantity + item?.quantity <=
            data?.product_variants[selectedIndex]?.qty
          ) {
            cartItems[index].quantity += count;

            setCartItems(cartItems);
            setCookie(null, "lexzinCart", JSON.stringify(cartItems), {
              maxAge: 30 * 24 * 60 * 60,
              path: "/",
            });

            setIsCartOpen(true);
          } else {
            toast.error("Out of stock");
          }
        } else {
          if (cartItems[index].quantity + item?.quantity <= data?.qty) {
            cartItems[index].quantity += count;

            setCartItems(cartItems);
            setCookie(null, "lexzinCart", JSON.stringify(cartItems), {
              maxAge: 30 * 24 * 60 * 60,
              path: "/",
            });

            setIsCartOpen(true);
          } else {
            toast.error("Out of stock");
          }
        }
      }

      if (is_exist === undefined) {
        if (data?.product_variation_status == 1) {
          if (data?.product_variants[selectedIndex]?.qty > 0) {
            setCartItems((cartItems) => [...cartItems, item]);
            setCookie(
              null,
              "lexzinCart",
              JSON.stringify([...cartItems, item]),
              {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
              }
            );

            setIsCartOpen(true);
            // window.fbq("track", "AddToCart", {
            //   content_name: `${data?.product_name}`,
            //   content_ids: [`${data?.slug}`],
            //   content_type: "product",
            //   value: item?.sellingPrice * item?.quantity,
            //   currency: "BDT",
            //   sku: data?.sku,
            // });
          } else {
            toast.error("Out of stock");
          }
        } else {
          if (data?.qty > 0) {
            setCartItems((cartItems) => [...cartItems, item]);
            setCookie(
              null,
              "lexzinCart",
              JSON.stringify([...cartItems, item]),
              {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
              }
            );

            setIsCartOpen(true);
            // window.fbq("track", "AddToCart", {
            //   content_name: `${data?.product_name}`,
            //   content_ids: [`${data?.slug}`],
            //   content_type: "product",
            //   value: item?.sellingPrice * item?.quantity,
            //   currency: "BDT",
            //   sku: data?.sku,
            // });
          } else {
            toast.error("Out of stock");
          }
        }
      }
    } else {
      const element = document.getElementById(variation);

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      toast.error(`Please select a size`);
    }
  };

  const handleOrder = (variation) => {
    if (
      (data?.product_variation_status == 1 && variationId !== null) ||
      data?.product_variation_status == 0
    ) {
      let item = {
        product_id: data?.id,
        slug: data?.slug,
        variant_id: data?.product_variation_status == 1 ? variationId : null,
        name: data?.product_name,
        image:
          data?.product_variation_status == 1
            ? data?.product_variants[selectedIndex]?.image[0]
            : data?.image[0],
        regularPrice:
          data?.product_variation_status == 1
            ? data?.product_variants[selectedIndex]?.regular_price
            : data?.regular_price,
        sellingPrice:
          data?.product_variation_status == 1
            ? data?.product_variants[selectedIndex]?.sale_price
            : data?.sale_price,
        quantity: count,
        variations:
          data?.product_variation_status == 1 && variationId
            ? data?.product_variants[selectedIndex]?.product_variant_name
            : null,
        stock:
          data?.product_variation_status == 1
            ? data?.product_variants[selectedIndex]?.qty
            : data?.qty,
        discount:
          data?.product_variation_status == 1
            ? data?.product_variants[selectedIndex]?.discount
            : data?.discount,
        sale_unit_id: data?.unit_id,
        discount_type:
          data?.product_variation_status == 1
            ? data?.product_variants[selectedIndex]?.discount_type
            : data?.discount_type,
      };
      const is_exist = cartItems.find(
        (variation) =>
          variation.product_id == item.product_id &&
          variation.variant_id == item.variant_id
      );

      if (is_exist) {
        const index = cartItems.findIndex(
          (variation) =>
            variation?.product_id == is_exist.product_id &&
            variation.variant_id == is_exist.variant_id
        );

        if (data?.product_variation_status == 1) {
          if (
            cartItems[index].quantity + item?.quantity <=
            data?.product_variants[selectedIndex]?.qty
          ) {
            cartItems[index].quantity += count;

            setCartItems(cartItems);
            setCookie(null, "lexzinCart", JSON.stringify(cartItems), {
              maxAge: 30 * 24 * 60 * 60,
              path: "/",
            });
            router.push(`/checkout`);
          } else {
            toast.error("Out of stock");
          }
        } else {
          if (cartItems[index].quantity + item?.quantity <= data?.qty) {
            cartItems[index].quantity += count;

            setCartItems(cartItems);
            setCookie(null, "lexzinCart", JSON.stringify(cartItems), {
              maxAge: 30 * 24 * 60 * 60,
              path: "/",
            });
            router.push(`/checkout`);
          } else {
            toast.error("Out of stock");
          }
        }
      }

      if (is_exist === undefined) {
        if (data?.product_variation_status == 1) {
          if (data?.product_variants[selectedIndex]?.qty > 0) {
            setCartItems((cartItems) => [...cartItems, item]);
            setCookie(
              null,
              "lexzinCart",
              JSON.stringify([...cartItems, item]),
              {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
              }
            );

            toast.success("Product Added");
            router.push(`/checkout`);
          } else {
            toast.error("Out of Stock");
          }
        } else {
          if (data?.qty > 0) {
            setCartItems((cartItems) => [...cartItems, item]);
            setCookie(
              null,
              "lexzinCart",
              JSON.stringify([...cartItems, item]),
              {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
              }
            );

            toast.success("Product Added");
            router.push(`/checkout`);
          } else {
            toast.error("Out of stock");
          }
        }
      }
    } else {
      const element = document.getElementById(variation);

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      toast.error(`Please select a size`);
    }
  };

  const handleRequestStock = (slug, id) => {
    setProdId(slug);
    setId(id);
    setRequestStockModal(true);
  };

  const handleDisabled = () => {
    if (
      data?.product_variation_status == 1 &&
      selectedItem == null &&
      selectVariation?.length > 0
    ) {
      toast.error(`There is no product in this variation`);
    }
  };

  const handleFb = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${`${originUrl}${router?.asPath}`}`,
      "facebook-share-dialog",
      "width=626,height=436"
    );
  };

  useEffect(() => {
    if (data?.product_variation_status == 1) {
      let dd = data?.product_variants?.reduce((a, b) => a + b?.qty, 0);
      setTotalQty(dd);
    } else {
      setTotalQty(data?.qty);
    }
  }, [data]);

  const handleWhatsApp = () => {
    const encodedUrl = encodeURIComponent(`${originUrl}${router?.asPath}`);
    window.open(`https://api.whatsapp.com/send?text=${encodedUrl}`, "_blank");
  };

  const handleCopyName = async () => {
    try {
      await navigator.clipboard.writeText(data?.product_name);
      toast.success("product name copied to clipboard");
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  const handleCopyVariationName = async (variantName) => {
    try {
      await navigator.clipboard.writeText(variantName);
      toast.success("variation name copied to clipboard");
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  return (
    <div className="col-span-1 text-black">
      {/* PRODUCT NAME */}
      <div className="flex items-center justify-between gap-5 xs:gap-2 xms:gap-2 xls:gap-2 sm:gap-3 py-1">
        <div className="flex items-center  gap-2">
          <p className="text-2xl lg:text-3xl font-light tracking-wide text-black mb-2">
            {data?.product_name}
          </p>
        </div>
      </div>
      {/* MADE & BRAND */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-600">Brand:</div>
          <div
            // href={`/brand/${data?.brands?.slug}`}
            className="w-[70px] group"
          >
            <Image
              className="object-fill content-center"
              src={
                isDevelopment
                  ? "/assets/logo/laxzin-logo-black.png"
                  : `${imageHostName}/storage/${contactInfo?.logo}`
              }
              width={420}
              height={420}
              alt={`${data?.brands?.name}`}
            />
          </div>
        </div>
        <span className="text-sm text-gray-600">
          Made In {data?.made_in_country?.name}
        </span>
      </div>
      {/* RATING */}
      <div className="flex items-center space-x-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-sm">
            ★
          </span>
        ))}
        <span className="text-sm text-gray-500 ml-2">(150 reviews)</span>
      </div>

      {/* PRICING */}
      <div className="flex items-center space-x-4">
        <span className="text-3xl font-light text-black">
          {data?.product_variation_status == 0 ? (
            <span>৳ {data?.sale_price * count}</span>
          ) : (
            <span>
              ৳{" "}
              {data?.product_variants?.length > 0 &&
                data?.product_variants[selectedIndex]?.sale_price * count}
            </span>
          )}
        </span>
        <span className="text-xl text-gray-500 line-through">
          {data?.product_variation_status == 0 ? (
            <>
              {data?.regular_price == data?.sale_price ? null : (
                <span className="line-through pl-1">
                  {" "}
                  ৳ {data?.regular_price}
                </span>
              )}
            </>
          ) : (
            <>
              {data?.product_variants?.length > 0 &&
              data?.product_variants[selectedIndex]?.regular_price ==
                data?.product_variants[selectedIndex]?.sale_price ? null : (
                <span className="line-through pl-1">
                  ৳{" "}
                  {data?.product_variants?.length > 0 &&
                    data?.product_variants[selectedIndex]?.regular_price *
                      count}
                </span>
              )}
            </>
          )}
        </span>
        {data?.discount > 0 ? (
          <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
            {data?.discount}% OFF
          </span>
        ) : null}
      </div>
      {/* STOCK - QUANTITY */}
      <div className=" block">
        {!clickFlag ? (
          <>
            {totalQty == 0 ? (
              <div className=" text-red-500 xls:text-xs xms:text-xs xs:text-xs py-1">
                Out of stock
              </div>
            ) : (
              <div className="text-green-600 text-sm font-medium">In stock</div>
            )}
          </>
        ) : variationQty > 0 ? (
          <div className=" text-red-500 xls:text-xs xms:text-xs xs:text-xs py-1">
            (In stock)
          </div>
        ) : (
          <div className=" text-red-500 xls:text-xs xms:text-xs xs:text-xs py-1">
            Out of stock
          </div>
        )}
      </div>
      {/* PRODUCT SIZE SECTION */}
      <div>
        {data?.product_variants?.length > 0 && (
          <>
            {totalQty === 0 ? null : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xls:grid-cols-2 xms:grid-cols-2 xs:grid-cols-2 py-1 w-[60%] md:w-[70%] sm:w-[75%] xls:w-full xms:w-full xs:w-full gap-4">
                {data?.product_variants?.map((item, index) => (
                  <>
                    {clickFlag == false ? (
                      <div className="flex items-center gap-2 text-sm xs:text-base">
                        <button
                          className={`bg-gray-300 text-black
                    px-2 py-2 w-full rounded cursor-pointer flex items-center justify-center gap-2`}
                          onClick={() =>
                            handleVariationImageClick(item?.id, index)
                          }
                        >
                          <div className="text-black xls:text-xs xms:text-xs xs:text-xs">
                            {item?.product_variant_name}
                          </div>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          className={`${
                            item?.id == variationId
                              ? "bg-black text-white"
                              : "bg-gray-300 text-black"
                          } px-2 py-2 rounded cursor-pointer w-full`}
                          onClick={() =>
                            handleVariationImageClick(item?.id, index)
                          }
                        >
                          <div className=" xls:text-xs xms:text-xs xs:text-xs">
                            {item?.product_variant_name}
                          </div>
                        </button>
                      </div>
                    )}
                  </>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      {/* PRODUCT BENEFIT SECTION */}
      <ProductBenefits />
      {/* Quantity Selector */}
      <div className="flex items-center space-x-4 mt-5">
        <span className="text-gray-700">Qty:</span>
        <div className="flex items-center border border-gray-300 ">
          <button
            onClick={() => setCount(count > 1 ? count - 1 : 1)}
            className="px-3 py-2 hover:bg-gray-100 transition-colors"
          >
            -
          </button>
          <span className="px-4 py-2 border-x border-gray-300">{count}</span>
          <button
            onClick={() =>
              data?.product_variation_status == 1
                ? variationId !== null
                  ? count < data?.product_variants[selectedIndex]?.qty
                    ? setCount((c) => c + 1)
                    : toast.error("You cant add more than product!")
                  : toast.error("Must select variation !")
                : count < data?.qty
                ? setCount((c) => c + 1)
                : toast.error("You cant add more than product!")
            }
            className="px-3 py-2 hover:bg-gray-100 transition-colors"
          >
            +
          </button>
        </div>
      </div>
      {/* ACTION BUTTONS */}
      <div className="mt-5">
        {totalQty == 0 ? null : (
          <div className="flex justify-between w-full">
            {data?.product_variation_status == 1 &&
            selectedItem == null &&
            selectVariation?.length > 0 ? (
              <div className="flex justify-between w-full gap-4">
                <Button
                  onClick={() => handleDisabled()}
                  className="bg-black flex items-center justify-center col-span-1 py-3 cursor-pointer w-full"
                >
                  <AiOutlineShoppingCart className="text-white text-[20px] mr-4" />
                  <div className="text-white text-[14px] xs:text-sm md:text-base">
                    Add To Cart
                  </div>
                </Button>
                <Button
                  onClick={() => handleDisabled()}
                  className="flex items-center justify-center col-span-1 py-3 cursor-pointer hover:bg-primary w-full"
                >
                  <BsBagCheck className="text-white text-[20px] mr-4" />
                  <div className="text-white  text-[14px] xs:text-sm md:text-base">
                    Buy Now
                  </div>
                </Button>
                <Button className="bg-gray-200 py-3 px-4 border transition-colors w-full xs:w-auto group flex-shrink">
                  <Link
                    href="https://play.google.com/store/apps/details?id=com.laxzinapp"
                    target="_blank"
                    className="flex items-center gap-3 text-black group-hover:text-white"
                  >
                    {/* <div className="text-white font-bold text-[14px] xs:text-[12px]">
                      {data?.product_variation_status == 0 ? (
                        <p>
                          {data?.sale_price !== data?.app_price ? (
                            <span>
                              {" "}
                              Save{" "}
                              {Number(
                                data?.sale_price - data?.app_price
                              ).toFixed(2)}{" "}
                              tk On App. Price : {data?.app_price} tk. Get App
                            </span>
                          ) : (
                            <span>Get App</span>
                          )}
                        </p>
                      ) : (
                        <p>
                          {data?.product_variants?.length > 0 &&
                          data?.product_variants?.[selectedIndex] ? (
                            data.product_variants[selectedIndex].app_price ===
                            data.product_variants[selectedIndex].sale_price ? (
                              <span>Get App</span>
                            ) : (
                              <span>
                                Save{" "}
                                {Number(
                                  data.product_variants[selectedIndex]
                                    .sale_price -
                                    data.product_variants[selectedIndex]
                                      .app_price
                                ).toFixed(2)}{" "}
                                tk On App. Price :{" "}
                                {data.product_variants[selectedIndex].app_price}{" "}
                                tk. Get App
                              </span>
                            )
                          ) : null}
                        </p>
                      )}
                    </div> */}
                    <BiLogoPlayStore size={22} /> <p>Get App</p>
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col xs:flex-row justify-between w-full gap-4">
                <Button
                  onClick={() => handleCart("variation")}
                  className="bg-black flex items-center justify-center col-span-1 py-3 cursor-pointer  w-full gap-3"
                >
                  <AiOutlineShoppingCart className="text-white text-[20px]" />
                  <div className="text-white text-[14px] xs:text-sm md:text-base">
                    Add To Cart
                  </div>
                </Button>
                <Button
                  onClick={() => handleOrder("variation")}
                  className=" flex items-center justify-center w-full gap-3"
                >
                  <BsBagCheck className="text-white text-[20px]" />
                  <div className="text-white text-[14px] xs:text-sm md:text-base">
                    Buy Now
                  </div>
                </Button>
                <Button className="bg-gray-200 py-3 px-4 border transition-colors w-full group">
                  <Link
                    href="https://play.google.com/store/apps/details?id=com.laxzinapp"
                    target="_blank"
                    className="flex items-center gap-3 text-black group-hover:text-white justify-center"
                  >
                    {/* <div className="text-white font-bold text-[14px] xs:text-[12px]">
                      {data?.product_variation_status == 0 ? (
                        <p>
                          {data?.sale_price !== data?.app_price ? (
                            <span>
                              {" "}
                              Save{" "}
                              {Number(
                                data?.sale_price - data?.app_price
                              ).toFixed(2)}{" "}
                              tk On App. Price : {data?.app_price} tk. Get App
                            </span>
                          ) : (
                            <span>Get App</span>
                          )}
                        </p>
                      ) : (
                        <p>
                          {data?.product_variants?.length > 0 &&
                          data?.product_variants?.[selectedIndex] ? (
                            data.product_variants[selectedIndex].app_price ===
                            data.product_variants[selectedIndex].sale_price ? (
                              <span>Get App</span>
                            ) : (
                              <span>
                                Save{" "}
                                {Number(
                                  data.product_variants[selectedIndex]
                                    .sale_price -
                                    data.product_variants[selectedIndex]
                                      .app_price
                                ).toFixed(2)}{" "}
                                tk On App. Price :{" "}
                                {data.product_variants[selectedIndex].app_price}{" "}
                                tk. Get App
                              </span>
                            )
                          ) : null}
                        </p>
                      )}
                    </div> */}
                    <BiLogoPlayStore size={26} /> <p>Get App</p>
                  </Link>
                </Button>
              </div>
            )}
          </div>
        )}

        {/* <div className="grid grid-cols-2 gap-2 py-2">
          <div className="flex items-center px-2 py-2 gap-10 xxxsm:gap-2 xsm:gap-3 xs:gap-4 sm:gap-5">
            <Image 
              src={"/assets/category/cash_on_delivery.webp"}
              width={40}
              height={40}
              alt="cash"
            />
            <div className="xs:text-[14px] text-[11px]">
              Cash On Delivery Available
            </div>
          </div>
          <div className="flex items-center px-2 py-2 gap-10  xxxsm:gap-2 xsm:gap-3 xs:gap-4 sm:gap-5">
            <Image
              src={"/assets/category/policy.webp"}
              width={40}
              height={40}
              alt="policy"
            />
            <div className="xs:text-[14px] text-[11px]">View Policy</div>
          </div>
        </div> */}
      </div>
      {/* DELIVERY POLICY */}
      <DeliveryInfoSection />
      {/* DISCLAIMER */}
      <div className="rounded-2xl border bg-amber-50 border-amber-200 p-2 xs:p-4 text-amber-800 shadow-sm mt-5 block xs:hidden">
        <div className="flex items-start gap-3">
          <BsInfoCircleFill
            className="size-4 xs:size-5 mt-0.5 shrink-0"
            aria-hidden
          />
          <div>
            <p className="font-semibold text-sm xs:text-base">Declaimer:</p>
            <div className="text-xs md:text-sm leading-6">
              <div dangerouslySetInnerHTML={{ __html: data?.disclaimer }} />
            </div>
          </div>
        </div>
      </div>
      {/* SHARE OPTIONS */}
      <div className="py-3 flex  items-center gap-4">
        <div className="text-[12px]">Share to:</div>
        <div className="flex items-center">
          <Link
            href={`${contactInfo?.facebook}`}
            target="_blank"
            className="px-2"
          >
            <Image
              src={"/assets/category/facebook.svg"}
              width={30}
              height={30}
              alt="logo"
            />
          </Link>
          <Link
            href={`${contactInfo?.instagram_link}`}
            target="_blank"
            className="px-2"
          >
            <Image
              src={"/assets/category/instagram.svg"}
              width={30}
              height={30}
              alt="logo"
            />
          </Link>
          <Link
            href={`${contactInfo?.whatsapp_link}`}
            target="_blank"
            className="px-2"
          >
            <Image
              src={"/assets/slider/whatsapp.webp"}
              width={30}
              height={30}
              alt="logo"
            />
          </Link>
          <Link
            href={`${contactInfo?.twitter_link}`}
            target="_blank"
            className="px-2"
          >
            <Image
              src={"/assets/slider/twitter.webp"}
              width={30}
              height={30}
              alt="logo"
            />
          </Link>

          <Link
            href={`${contactInfo?.tiktok_link}`}
            target="_blank"
            className="px-2"
          >
            <Image
              src={"/assets/category/tiktok.svg"}
              width={30}
              height={30}
              alt="logo"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Details;
