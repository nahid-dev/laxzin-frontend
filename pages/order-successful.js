import SectionHeader from "@/Components/SectionHeader";
import { useStatus } from "@/context/contextStatus";
import Link from "next/link";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";

const PaymentSuccessful = () => {
  const cookie = parseCookies();
  const [isVisible, setIsVisible] = useState(false);
  const { setCartItems, cartItems, renderMe, orderObj } = useStatus();
  const [orderDetail, setOrderDetail] = useState({});

  useEffect(() => {
    setCartItems(cartItems);
  }, [renderMe]);

  useEffect(() => {
    if (cookie?.hasOwnProperty("orderObj")) {
      setOrderDetail(JSON.parse(cookie.orderObj));
    }
  }, [orderObj]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-[670px]">
      <div className="max-w-7xl  py-4 sm:max-w-[40rem] xls:mx-w-[24rem] xms:max-w-[22rem] xs:max-w-[16rem] mx-auto h-full font-sans hidden">
        <div className="flex justify-center items-center h-full pt-48">
          <div className="space-y-3">
            <div className="flex justify-center">
              <BsFillCheckCircleFill size={40} className="text-green-500 " />
            </div>
            <div className="text-3xl font-semibold text-center dark:text-black">
              Thank you we have received your Order
            </div>
            <div className="text-center text-black">
              Your order is placed with{" "}
              <span className="font-semibold">Cash on delivery.</span>
            </div>
            <div className="text-center text-black">
              You will receive an SMS notification regarding the order.
            </div>
            <div className="text-center text-black">
              Your order ID is{" "}
              <span className="font-semibold">{orderDetail?.invoice_no}</span>{" "}
              and total value is{" "}
              <span className="font-semibold">{orderDetail?.grand_total}</span>
            </div>
            <div className="text-center text-black">
              Your shipping address is{" "}
              <span className="font-semibold">{orderDetail?.information}</span>
            </div>
            <div className="text-center text-black">
              Please remembar this information for any kind of future
              inconvenience regarding your order.
            </div>
          </div>
        </div>
        <Link className="flex justify-center mt-10" href={`/`}>
          <button className="bg-gray-800 text-white text-base px-4 py-2 rounded-md">
            Return to home
          </button>
        </Link>
      </div>

      {/* Header Section */}
      <div className="bg-black text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Success Icon */}
            <div className="inline-flex items-center justify-center size-10 sm:size-20 bg-green-500 rounded-full mb-6 animate-pulse">
              <svg
                className="size-6 sm:size-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-4xl md:text-5xl font-light tracking-wide mb-4">
              Order Confirmed
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Thank you for choosing Laxzin. Your order has been successfully
              placed and we're preparing it for delivery.
            </p>
          </div>
        </div>
      </div>
      {/* Order Details Section */}
      <div className="max-w-7xl mx-auto px-2 xl:px-0 py-8">
        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionHeader title="Order Details" />

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Order Information Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-light mb-6 text-gray-900">
                Order Information
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Order ID</span>
                  <span className="font-medium text-gray-900 font-mono">
                    {orderDetail.invoice_no}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="font-medium text-gray-900 text-xl">
                    ৳{orderDetail.grand_total}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium text-gray-900">
                    {orderDetail.paymentMethod}
                  </span>
                </div>

                {/* <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600">Estimated Delivery</span>
                  <span className="font-medium text-gray-900">
                    {orderDetail.estimatedDelivery}
                  </span>
                </div> */}
              </div>
            </div>

            {/* Shipping Information Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-light mb-6 text-gray-900">
                Shipping Details
              </h3>

              <div className="space-y-4">
                <div className="py-3 border-b border-gray-100">
                  <span className="text-gray-600 block mb-2">
                    Delivery Address
                  </span>
                  <span className="font-medium text-gray-900">
                    {orderDetail.information}
                  </span>
                </div>

                <div className="py-3 border-b border-gray-100">
                  <span className="text-gray-600 block mb-2">
                    SMS Notification
                  </span>
                  <span className="text-gray-900">
                    You will receive SMS updates about your order status
                  </span>
                </div>

                <div className="py-3">
                  <span className="text-gray-600 block mb-2">
                    Order Tracking
                  </span>
                  <span className="text-gray-900">
                    Track your order status in your account dashboard
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What's Next Section */}
        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-gray-50 rounded-2xl p-8 mt-12">
            <h3 className="text-2xl font-light mb-6 text-center text-gray-900">
              What Happens Next?
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-medium">1</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Order Processing
                </h4>
                <p className="text-gray-600 text-sm">
                  We'll prepare your order within 24 hours
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-medium">2</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Shipping</h4>
                <p className="text-gray-600 text-sm">
                  Your order will be shipped to your address
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-medium">3</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Delivery</h4>
                <p className="text-gray-600 text-sm">
                  Receive your Laxzin products at your doorstep
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Note */}
        <div
          className={`transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mt-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="w-6 h-6 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="text-amber-800 font-medium mb-1">
                  Important Information
                </h4>
                <p className="text-amber-700 text-sm">
                  Please save your order ID ({orderDetail.invoice_no}) for
                  future reference. You may need it for order tracking, returns,
                  or customer support inquiries.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className={`transition-all duration-1000 delay-900 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-300 font-medium"
            >
              Continue Shopping
            </Link>

            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-black text-black rounded-full hover:bg-black hover:text-white transition-all duration-300 font-medium"
            >
              View All Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessful;
