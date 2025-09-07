import CommonbgBanner from "@/Components/Common/CommonbgBanner";
import { useStatus } from "@/context/contextStatus";
import postRequest from "@/lib/postRequest";
import request from "@/lib/request";

import dayjs from "dayjs";
import Head from "next/head";
import { useRouter } from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import { TiDeleteOutline } from "react-icons/ti";
import { imageHostName } from "@/lib/config";
import { AiTwotoneDelete } from "react-icons/ai";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";
import { Breadcrumb } from "antd";

const INPUT_FIELD_STYLE =
  "border border-gray-300 h-[25px] w-full pl-2 py-5 rounded-md outline-none bg-white text-black placeholder:text-sm";
const SELECT_STYLE =
  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black transition-all duration-300 bg-white text-gray-700 appearance-none cursor-pointer";

const Checkout = () => {
  const {
    renderMe,
    cartItems,
    type,
    setType,
    promoValue,
    setPromoValue,
    userId,
    couponId,
    setCouponId,
    setCartItems,
    setIsRenderMe,
    setOrderObj,
    contactInfo,
  } = useStatus();
  const [deliveryData, setDeliveryData] = useState([]);
  const router = useRouter();
  const [total, setTotal] = useState(0);
  const [promo, setPromo] = useState("");
  const [totalQty, setTotalQty] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [payment, setPayment] = useState("cod");
  const [districts, setDistricts] = useState([]);
  const [allUpozilas, setAllUpozilas] = useState([]);
  const [selctedDistrict, setSelectedDistrict] = useState("");
  const [selectUpozila, setSelectUpozila] = useState("Select Area");
  const [upozilaList, setUpozilaList] = useState([]);
  const [shippingOption, setShippingOption] = useState("Out Side Dhaka");
  const [deliveryFee, setDeliveryFee] = useState(null);
  const [count, setCount] = useState(1);
  const [deleteItems, setDeleteItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      let res = await request(`delivery-charge`);
      setDeliveryData(res?.data);
    };
    getData();
  }, []);

  useEffect(() => {
    if (deliveryData) {
      setDeliveryFee(deliveryData[1]?.value);
    }
  }, [deliveryData]);

  useEffect(() => {
    const getData = async () => {
      let res = await request(`district-with-upozila`);
      // console.log("res", res);

      setDistricts(res?.districts);
      setAllUpozilas(res?.upozilas);
    };
    getData();
  }, []);

  const handleDistrictChange = (value) => {
    setSelectedDistrict(districts[value]?.name);
    setSelectUpozila("Select Area");

    const filteredupozila = allUpozilas?.filter(
      (upazila, index) => upazila?.district_id == districts[value]?.id
    );

    if (filteredupozila) setUpozilaList(filteredupozila);
  };

  useEffect(() => {
    if (selctedDistrict == "Dhaka") {
      if (selectUpozila == "Dhaka Sadar") {
        setShippingOption("In Side Of Dhaka");
        setDeliveryFee(deliveryData[0]?.value);
      } else {
        setShippingOption("Dhaka Sub Area");
        setDeliveryFee(deliveryData[2]?.value);
      }
    } else {
      setShippingOption("Out Side Dhaka");
      setDeliveryFee(deliveryData[1]?.value);
    }
  }, [selctedDistrict, selectUpozila]);

  useEffect(() => {
    let dd = cartItems?.reduce(
      (a, b) =>
        a +
        (b?.sellingPrice
          ? b?.sellingPrice * b?.quantity
          : b?.sellingPrice * b?.quantity),
      0
    );

    setTotal(Number(dd));
  }, [renderMe]);

  const FREE_DELIVERY_THRESHOLD = contactInfo?.free_delivery_amount;
  const progress =
    total >= FREE_DELIVERY_THRESHOLD
      ? 100
      : Math.min(100, Math.round((total / FREE_DELIVERY_THRESHOLD) * 100));
  const amountLeft = Math.max(0, FREE_DELIVERY_THRESHOLD - total);

  useEffect(() => {
    if (total >= FREE_DELIVERY_THRESHOLD) {
      setDeliveryFee(0);
    } else {
      const foundOption = deliveryData?.find(
        (item) => item?.name === shippingOption
      );

      setDeliveryFee(foundOption?.value ?? 0);
    }
  }, [total, shippingOption, deliveryData]);

  const discountedTotal =
    type === 1
      ? total - promoValue
      : type === 2
      ? total - Math.round((total * promoValue) / 100)
      : total;

  const grandTotal =
    total >= FREE_DELIVERY_THRESHOLD
      ? Math.round(discountedTotal)
      : Math.round(discountedTotal + deliveryFee);

  const handleChange = (value) => {
    setPromo(value);
  };

  const handlePromo = async () => {
    const res = await postRequest(`coupon-code-check`, {
      coupon_code: promo,
    });

    if (res?.success) {
      setPromo("");
      toast.success(`${res?.message}`);

      setType(res?.data?.type);
      setCookie(null, "type", res?.data?.type, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      setPromoValue(res?.data?.value);
      setCookie(null, "promovalue", res?.data?.value, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      setCouponId(res?.data?.id);
      setCookie(null, "couponid", res?.data?.id, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    } else {
      toast.error(`${res?.message}`);
    }
  };

  useEffect(() => {
    let totalQuantity = cartItems?.reduce((a, b) => a + b?.quantity, 0);

    setTotalQty(Number(totalQuantity));
  }, [renderMe]);

  let arr = [];
  let layerArr = [];
  cartItems?.map((item, index) => {
    arr.push({
      variant_id: item?.variant_id,
      product_id: item?.product_id,
      qty: item?.quantity,
      sale_unit_id: item?.sale_unit_id,
      net_unit_price: item?.sellingPrice,
      regular_price: item?.regularPrice,
      discount_type: item?.discount_type == "amount" ? 1 : 2,
      discount: item?.discount,
      discount_rate:
        (item?.discount_type == "amount"
          ? item?.discount
          : (item?.regularPrice * item?.discount) / 100) * item?.quantity,
      total: item?.sellingPrice * item?.quantity,
    });
    layerArr.push({
      item_id: item?.sku,
      item_name: item?.name,
      index: index,

      item_variant: item?.variations,
      price: item?.sellingPrice,
      quantity: item?.quantity,
    });
  });

  useEffect(() => {
    let layerArr = [];

    cartItems?.map((item, index) => {
      layerArr.push({
        item_id: item?.sku,
        item_name: item?.name,
        index: index,
        item_variant: item?.variations,
        price: item?.sellingPrice,
        quantity: item?.quantity,
      });
    });
    const ecommerce = {
      currency: "BDT",
      value: cartItems?.reduce(
        (a, b) =>
          a +
          (b?.sellingPrice
            ? b?.sellingPrice * b?.quantity
            : b?.sellingPrice * b?.quantity),
        0
      ),

      coupon: type ? Math.round(Number(promoValue).toFixed(2)) : "",
      items: layerArr,
    };

    window.dataLayer = window.dataLayer || [];
    dataLayer.push({
      event: "begin_checkout",
      ecommerce,
    });
  }, [renderMe]);

  const handleOrder = async () => {
    let validation = false;

    if (cartItems?.length == 0) {
      validation = true;
      toast.error("you must have to add atleast 1 product");
      return;
    }

    if (name == "" || name == undefined) {
      toast.error("name is required");
      return;
    }

    if (phone == "" || phone == undefined) {
      toast.error("Phone number is required");
      return;
    }

    if (phone) {
      var bdMobilePattern = /^(\+)?(88)?01[3-9]\d{8}$/;
      if (bdMobilePattern.test(phone)) {
      } else {
        toast.error("Not a valid phone number");

        return;
      }
    }

    if (selctedDistrict == "") {
      toast.error("City is required");
      return;
    }

    if (selectUpozila == "" || selectUpozila == "Select Area") {
      toast.error("Area is required");
      return;
    }

    if (address == "") {
      validation = true;
      toast.error("Address is required");
      return;
    }

    let uniqueId =
      "ECOM-" + (Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000);

    setIsLoading(true);
    let obj = {
      invoice_no: uniqueId,
      customer_id: null,
      item: Number(cartItems?.length),
      total_qty: Number(totalQty),
      coupon_type: type ? Number(type) : null,
      coupon_discount: type ? Math.round(Number(promoValue).toFixed(2)) : null,
      coupon_rate: type
        ? type == 1
          ? Math.round(Number(promoValue).toFixed(2))
          : Math.round((Number(total) * Number(promoValue)) / 100)
        : null,
      shipping_cost: deliveryFee,
      net_total: Math.round(total),
      grand_total:
        type == 1
          ? Number(Number(total) - Number(promoValue) + deliveryFee)
          : type == 2
          ? Number(
              Number(total) -
                (Number(total) * Number(promoValue)) / 100 +
                deliveryFee
            )
          : Number(total + deliveryFee),
      sale_date: dayjs(new Date()).format("YYYY-MM-DD"),
      coupon_id: couponId ? Number(couponId) : null,
      name: name,
      phone: phone,
      information: address,
      note: orderNotes,
      s_product: arr,
      payment_via: payment == "bkash" ? "bkash" : "cod", //cod,bkash,rocket,nagad
    };

    let res = await postRequest(`checkout`, obj);

    if (res?.success) {
      destroyCookie([], "lexzinCart", {
        path: "/",
      });
      setCartItems([]);
      setPromo("");
      setType(null);
      setOrderObj(res?.product_details);
      setCookie(null, "orderObj", JSON.stringify(res?.product_details), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      destroyCookie(null, "type", {
        path: "/",
      });
      setType(null);

      setPromoValue(null);
      destroyCookie(null, "promovalue", {
        path: "/",
      });
      setCouponId("");
      destroyCookie(null, "couponid", {
        path: "/",
      });

      setIsRenderMe(!renderMe);
      setIsLoading(false);
      if (payment == "bkash") {
        window.location.href = res?.bkash_url;
      } else {
        router.push(`/order-successful`);
      }
      toast.success(`${res?.message}`);
    } else {
      toast.error(`${res?.message}`);
      setIsLoading(false);
    }
  };

  const handleCouponDelete = () => {
    setPromo("");
    setType(null);

    destroyCookie(null, "type", {
      path: "/",
    });

    setPromoValue(null);
    destroyCookie(null, "promovalue", {
      path: "/",
    });
    setCouponId("");
    destroyCookie(null, "couponid", {
      path: "/",
    });

    toast.success("Coupon successfully Deleted!");
  };

  const AddCart = (index) => {
    if (cartItems[index]?.quantity < cartItems[index]?.stock) {
      cartItems[index].quantity += count;
      setCartItems(cartItems);
      setCookie(null, "lexzinCart", JSON.stringify(cartItems), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      setIsRenderMe(!renderMe);
    } else {
      toast.error(`Out of stock`);
    }
  };

  const SubCart = (index) => {
    if (cartItems[index]?.quantity > 0) {
      cartItems[index].quantity -= count;
      setCartItems(cartItems);
      setCookie(null, "lexzinCart", JSON.stringify(cartItems), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    }
    if (cartItems[index]?.quantity === 0) {
      cartItems?.splice(index, 1);
      setCartItems(cartItems);
      setCookie(null, "lexzinCart", JSON.stringify(cartItems), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      toast(`product removed successfully`);
    }
    setIsRenderMe(!renderMe);
  };

  const DeleteItem = (index) => {
    setDeleteItems((prevData) => prevData.concat(cartItems[index]));

    setCartItems(cartItems.filter((item, idx) => idx !== index));
    setCookie(null, "parisBd", JSON.stringify(cartItems), {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    setIsRenderMe(!renderMe);
  };

  return (
    <>
      <Head>
        <title>Laxzin/checkout</title>
        <meta name="description" content="lexzin" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <CommonbgBanner name={`Checkout`} /> */}

      <div className="min-h-[600px] bg-gray-50">
        <div className="w-full max-w-7xl px-2 md:px-0 mx-auto">
          <div className="pt-3">
            <Breadcrumb
              items={[
                {
                  title: <a href="/">Home</a>,
                },
                {
                  title: <a href="">Checkout</a>,
                },
              ]}
            />
          </div>
          <div className="grid grid-cols-12 gap-5 pt-5 pb-10">
            {/* LEFT: BILLING AND SHIPPING */}
            <div className="md:col-span-7 col-span-full bg-white shadow-xl rounded-2xl p-5 h-fit">
              <div className="flex items-center gap-3 mb-5">
                <div className="size-6 sm:size-8 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-xs sm:text-sm font-medium">
                    1
                  </span>
                </div>
                <h2 className="text-lg sm:text-2xl font-light tracking-wide text-gray-600">
                  Billing & Shipping
                </h2>
              </div>

              <div className="mt-2">
                <div className="grid xxxsm:grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      className={INPUT_FIELD_STYLE}
                      value={name}
                      placeholder="Name"
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>

                  <div>
                    <input
                      className={INPUT_FIELD_STYLE}
                      value={phone}
                      placeholder="Phone"
                      onChange={(event) => setPhone(event.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 xxxsm:grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                  <div className="relative">
                    <select
                      className={SELECT_STYLE}
                      onChange={(e) => handleDistrictChange(e.target.value)}
                    >
                      <option value="" disabled selected>
                        Select city
                      </option>
                      {districts?.map((item, index) => (
                        <option value={index} key={index}>
                          {item?.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="size-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="relative">
                    <select
                      className={SELECT_STYLE}
                      onChange={(e) => {
                        setSelectUpozila(e.target.value);
                      }}
                      value={selectUpozila}
                      disabled={selctedDistrict === "" ? true : false}
                    >
                      <option value="" selected>
                        Select Area
                      </option>
                      {upozilaList?.map((item, index) => (
                        <option value={item?.name} key={index}>
                          {item?.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="size-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <input
                    className="border border-gray-300 h-[25px] w-full pl-2 py-5 rounded-md outline-none bg-white text-sm text-black placeholder:text-sm"
                    value={address}
                    placeholder="Address"
                    onChange={(event) => setAddress(event.target.value)}
                  />
                </div>
                {/* ORDER NOTES */}
                <div className="my-4">
                  <textarea
                    className="w-full py-2 pl-2 text-sm text-black bg-white border border-gray-300 rounded-md outline-none focus:outline-none placeholder:text-sm"
                    value={orderNotes}
                    rows={6}
                    placeholder="Order Notes"
                    onChange={(event) => setOrderNotes(event.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* RIGHT: ORDER SUMMARY */}
            <div className="md:col-span-5 col-span-full bg-white shadow-xl rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-5">
                <div className="size-6 sm:size-8 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-xs sm:text-sm font-medium">
                    2
                  </span>
                </div>
                <h2 className="text-lg sm:text-2xl font-light tracking-wide text-gray-600">
                  Order Summary
                </h2>
              </div>
              {/* FREE DELIVERY */}
              <div
                className={`bg-gradient-to-r ${
                  total >= FREE_DELIVERY_THRESHOLD
                    ? "from-green-50 border-green-200"
                    : "from-orange-50 border-orange-500"
                }  to-yellow-50 border rounded-xl p-6`}
              >
                <div className="mb-1 text-sm font-medium">
                  {total >= FREE_DELIVERY_THRESHOLD ? (
                    <span className="text-green-600">
                      ✅ <span className="font-bold">Congratulations!</span>{" "}
                      You've qualified for{" "}
                      <span className="font-bold">Free Delivery</span>.
                    </span>
                  ) : (
                    <span className="text-black flex items-center gap-2">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                          />
                        </svg>
                      </div>{" "}
                      Spend{" "}
                      <span className="font-bold text-orange-500">
                        TK. {amountLeft}
                      </span>{" "}
                      more to enjoy{" "}
                      <span className="font-bold">FREE Delivery!</span>
                    </span>
                  )}
                </div>

                <div className="w-full h-2.5 bg-pink-100 rounded-full">
                  <div
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      total >= FREE_DELIVERY_THRESHOLD
                        ? "bg-green-500"
                        : "bg-orang-500"
                    }`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              {/* CART ITEMS */}
              <div className="my-3">
                <h2 className="text-lg font-light">
                  Total Products ({cartItems?.length})
                </h2>
                <div className="max-h-[400px] overflow-y-scroll">
                  {cartItems?.length > 0 ? (
                    <div className="mt-4 space-y-4">
                      {cartItems?.map((item, index) => (
                        <div
                          className="p-2 rounded-lg flex bg-gray-100 gap-5"
                          key={index}
                        >
                          {/* PRODUCT IMAGE */}
                          <div className="size-16 bg-gray-300 rounded-xl">
                            <Image
                              src={`${imageHostName}/storage/product/${encodeURIComponent(
                                item?.image
                              )}`}
                              height={420}
                              width={420}
                              className="h-full w-full object-fill rounded-md"
                            />
                          </div>
                          <div className="w-full flex items-center">
                            <div className="flex flex-col gap-2 flex-grow">
                              <div className="text-xs sm:text-sm text-black uppercase font-medium text-wrap">
                                {item?.name}
                              </div>
                              {/* QUANTITY & DELETE */}
                              <div className="flex items-center justify-between w-full">
                                <div className=" flex items-center justify-center">
                                  <button
                                    className="bg-white rounded px-2 font-extrabold border border-black"
                                    onClick={() => SubCart(index)}
                                  >
                                    -
                                  </button>
                                  <input
                                    value={item?.quantity}
                                    className="outline-none w-[60px] xxsm:w-[30px] xxxsm:w-[30px] text-black h-[30px] text-center bg-transparent"
                                    readOnly
                                  />
                                  <button
                                    onClick={() => AddCart(index)}
                                    className="bg-white rounded px-2 font-extrabold border border-black"
                                  >
                                    +
                                  </button>
                                </div>
                                {/* PRICE */}
                                <div className="text-sm font-medium flex gap-2 text-black">
                                  <span className="uppercase ">
                                    ৳{" "}
                                    {Number(item?.sellingPrice) *
                                      Number(item?.quantity)}
                                  </span>
                                  {item?.variations == null ? null : (
                                    <div className="tracking-wider text-gray-600">
                                      . {item?.variations}
                                    </div>
                                  )}
                                </div>
                                {/* DELETE SECTION */}
                                <div
                                  className="cursor-pointer"
                                  onClick={() => DeleteItem(index)}
                                  title="Delete"
                                >
                                  <FaRegTrashAlt
                                    size={18}
                                    className="text-red-500"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-black text-xl text-center pt-7 pb-3">
                      Your Shopping Bag is Empty
                    </p>
                  )}
                </div>
              </div>
              {/* COUPON SECTION*/}
              <p className="capitalize text-lg font-light text-black">
                have coupon / voucher?
              </p>
              <div className="flex items-center space-x-3 mt-2">
                <div className="w-full">
                  <input
                    type="text"
                    className="rounded-md py-2 w-full  px-3 bg-white border border-gray-300 outline-none placeholder:text-sm text-black"
                    placeholder="Coupon Code"
                    onChange={(event) => handleChange(event.target.value)}
                    value={promo}
                  />
                </div>
                <div>
                  <button
                    className="bg-black px-4 h-10 text-white tracking-wide text-base rounded-md"
                    onClick={() => handlePromo()}
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* SHIPPING METHOD */}
              <div className="mt-3">
                <div>
                  <div className="space-y-3">
                    {[
                      { id: "outside-dhaka", label: "Out Side Dhaka" },
                      { id: "dhaka-sub", label: "Dhaka Sub Area" },
                      { id: "inside-dhaka", label: "In Side Of Dhaka" },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center justify-between p-3 rounded-md border ${
                          shippingOption === method.label
                            ? "border-black bg-gray-50 shadow-md"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <input
                            type="radio"
                            name="shipping"
                            value={method.label}
                            checked={shippingOption === method.label}
                            readOnly
                            className="w-5 h-5 text-black focus:ring-black"
                          />
                          <div>
                            <span className="text-gray-900 font-medium">
                              {method.label}
                            </span>
                          </div>
                        </div>
                        <span className="font-bold text-gray-900">
                          ৳{" "}
                          {
                            deliveryData?.find(
                              (item) => item?.name === method?.label
                            )?.value
                          }
                        </span>
                      </label>
                    ))}
                  </div>
                  {type == 1 ? (
                    <div className="flex justify-between items-center py-4 ">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-black">Discount</p>
                        <button onClick={() => handleCouponDelete()}>
                          <TiDeleteOutline
                            size={22}
                            className="text-red-500 cursor-pointer"
                          />
                        </button>
                      </div>
                      <p className="font-semibold text-base text-black">
                        ৳ {Number(promoValue).toFixed(2)}
                      </p>
                    </div>
                  ) : type == 2 ? (
                    <div className="flex justify-between items-center py-4">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-black">Discount</p>
                        <button onClick={() => handleCouponDelete()}>
                          <TiDeleteOutline
                            size={22}
                            className="text-red-500 cursor-pointer"
                          />
                        </button>
                      </div>
                      <p className="font-semibold text-base text-black">
                        ৳{" "}
                        {Math.round((Number(total) * Number(promoValue)) / 100)}
                      </p>
                    </div>
                  ) : null}

                  {/* TOTAL AMOUNT SECTION */}
                  <div>
                    <div
                      className={`flex items-center justify-between pb-3 ${
                        type ? "mt-0" : "mt-3"
                      } border-b border-gray-300`}
                    >
                      <p className="text-black">Total MRP</p>
                      <p className=" text-black pl-1 font-semibold">
                        ৳ {total}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3">
                      <p className="font-light text-lg sm:text-xl text-black capitalize">
                        Total amount
                      </p>
                      {deliveryFee == null ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <ThreeDots
                            height="30"
                            width="30"
                            radius="9"
                            color="#1F2937"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            visible={true}
                          />
                        </div>
                      ) : (
                        <p className=" text-red-600 font-semibold text-xl">
                          ৳ {grandTotal}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* PAYMENT METHOD */}
              <div className="my-3 flex gap-5 items-center justify-between">
                <label
                  htmlFor="cod"
                  className="flex items-center cursor-pointer justify-between w-full"
                >
                  <div
                    className={`flex items-center w-full border p-3 rounded-md ${
                      payment === "cod" ? "border-black" : "border-gray-300"
                    }`}
                  >
                    <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                      <input
                        checked={payment === "cod"}
                        type="radio"
                        id="cod"
                        name="payment"
                        className="appearance-none focus:opacity-100 focus:ring-black focus:outline-none border rounded-full border-black absolute cursor-pointer w-full h-full checked:border-none"
                        onChange={() => setPayment("cod")}
                      />
                      <div
                        className={`check-icon ${
                          payment === "cod" ? "block" : "hidden"
                        } border-4 border-black rounded-full w-full h-full z-1`}
                      ></div>
                    </div>
                    <p className="ml-2  text-black text-base capitalize">
                      cash on delivery
                    </p>
                  </div>
                </label>
                <label
                  htmlFor="bkash"
                  className="flex items-center cursor-pointer justify-between w-full"
                >
                  <div
                    className={`flex items-center rounded-md p-3 border ${
                      payment === "bkash" ? "border-black" : "border-gray-300"
                    } w-full`}
                  >
                    <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                      <input
                        checked={payment === "bkash"}
                        type="radio"
                        id="bkash"
                        name="payment"
                        className="appearance-none focus:opacity-100 focus:ring-black focus:outline-none border rounded-full border-black absolute cursor-pointer w-full h-full checked:border-none"
                        onChange={() => setPayment("bkash")}
                      />
                      <div
                        className={`check-icon ${
                          payment === "bkash" ? "block" : "hidden"
                        } border-4 border-black rounded-full w-full h-full z-1`}
                      ></div>
                    </div>
                    <p className="ml-2  text-black text-base">bKash</p>
                  </div>
                </label>
              </div>
              {isLoading ? (
                <button className="bg-myBlue-700 w-full bg-black  px-8 py-3 rounded-md cursor-pointer flex space-x-1 disabled justify-center items-center">
                  <svg
                    className="fill-current text-white animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C12.5523 2 13 2.44772 13 3V6C13 6.55228 12.5523 7 12 7C11.4477 7 11 6.55228 11 6V3C11 2.44772 11.4477 2 12 2ZM12 17C12.5523 17 13 17.4477 13 18V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V18C11 17.4477 11.4477 17 12 17ZM22 12C22 12.5523 21.5523 13 21 13H18C17.4477 13 17 12.5523 17 12C17 11.4477 17.4477 11 18 11H21C21.5523 11 22 11.4477 22 12ZM7 12C7 12.5523 6.55228 13 6 13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H6C6.55228 11 7 11.4477 7 12ZM19.0711 19.0711C18.6805 19.4616 18.0474 19.4616 17.6569 19.0711L15.5355 16.9497C15.145 16.5592 15.145 15.9261 15.5355 15.5355C15.9261 15.145 16.5592 15.145 16.9497 15.5355L19.0711 17.6569C19.4616 18.0474 19.4616 18.6805 19.0711 19.0711ZM8.46447 8.46447C8.07394 8.85499 7.44078 8.85499 7.05025 8.46447L4.92893 6.34315C4.53841 5.95262 4.53841 5.31946 4.92893 4.92893C5.31946 4.53841 5.95262 4.53841 6.34315 4.92893L8.46447 7.05025C8.85499 7.44078 8.85499 8.07394 8.46447 8.46447ZM4.92893 19.0711C4.53841 18.6805 4.53841 18.0474 4.92893 17.6569L7.05025 15.5355C7.44078 15.145 8.07394 15.145 8.46447 15.5355C8.85499 15.9261 8.85499 16.5592 8.46447 16.9497L6.34315 19.0711C5.95262 19.4616 5.31946 19.4616 4.92893 19.0711ZM15.5355 8.46447C15.145 8.07394 15.145 7.44078 15.5355 7.05025L17.6569 4.92893C18.0474 4.53841 18.6805 4.53841 19.0711 4.92893C19.4616 5.31946 19.4616 5.95262 19.0711 6.34315L16.9497 8.46447C16.5592 8.85499 15.9261 8.85499 15.5355 8.46447Z"></path>
                  </svg>
                  <p className="text-white">Proceeding To Payment...</p>
                </button>
              ) : (
                <div className="w-full mt-6" onClick={() => handleOrder()}>
                  <button className="w-full flex justify-center text-white bg-black  text-lg py-3 rounded-md capitalize">
                    place order
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
