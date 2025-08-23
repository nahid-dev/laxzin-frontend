import { useStatus } from "@/context/contextStatus";
import Link from "next/link";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import { FaRegClock, FaTruckFast } from "react-icons/fa6";
import { FaRegCalendarCheck } from "react-icons/fa";
import { GoPackage } from "react-icons/go";

const PaymentSuccessful = () => {
  const cookie = parseCookies();
  const { setCartItems, cartItems, renderMe, orderObj, contactInfo } =
    useStatus();
  const [orderDetail, setOrderDetail] = useState({});

  useEffect(() => {
    setCartItems(cartItems);
  }, [renderMe]);

  useEffect(() => {
    if (cookie?.hasOwnProperty("orderObj")) {
      setOrderDetail(JSON.parse(cookie.orderObj));
    }
  }, [orderObj]);

  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  // helpers
  const currency = (n) => `৳${Number(n || 0).toLocaleString()}`;
  const payLabel = (v) =>
    v === 1 || v === "1"
      ? "Cash on Delivery"
      : v === 2 || v === "2"
      ? "Online Payment"
      : "Unknown";

  const items = orderDetail?.sale_product_list || [];

  return (
    <div className="min-h-[670px]">
      <div className="max-w-7xl py-4 sm:max-w-[40rem] xls:mx-w-[24rem] xms:max-w-[22rem] xs:max-w-[16rem] mx-auto h-full font-sans">
        {/* Thank-you block */}
        <div className="flex items-center justify-center h-full">
          <div className="max-w-4xl px-6 mx-auto">
            <div className="text-center">
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-6 transition-all duration-1000 ${
                  showAnimation ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
              >
                <BsFillCheckCircleFill
                  className={`h-8 w-8 text-green-600 transition-all duration-700 delay-300 ${
                    showAnimation ? "scale-100" : "scale-0"
                  }`}
                />
              </div>
              <h1
                className={`text-4xl font-bold mb-4 transition-all duration-700 delay-500 ${
                  showAnimation
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
              >
                Order Confirmed!
              </h1>
              <p
                className={`text-muted-foreground text-lg mb-8 transition-all duration-700 delay-700 ${
                  showAnimation
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
              >
                Thank you for your purchase. Your order has been received and is
                being processed.
              </p>

              <div
                className={`max-w-lg mx-auto transition-all duration-700 delay-900 ${
                  showAnimation
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-8 h-8 mb-2 bg-green-500 rounded-full">
                      <BsFillCheckCircleFill className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs font-medium text-green-600">
                      Order Placed
                    </span>
                  </div>
                  <div className="flex-1 h-0.5 bg-green-500 mx-4"></div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-8 h-8 mb-2 bg-green-500 rounded-full">
                      <FaRegClock className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs font-medium text-green-600">
                      Processing
                    </span>
                  </div>
                  <div className="flex-1 h-0.5 bg-muted mx-4"></div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-8 h-8 mb-2 rounded-full bg-muted">
                      <FaTruckFast className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Shipped
                    </span>
                  </div>
                  <div className="flex-1 h-0.5 bg-muted mx-4"></div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-8 h-8 mb-2 rounded-full bg-muted">
                      <GoHome className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Delivered
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <FaRegCalendarCheck className="w-4 h-4" />
                  <span>Placed on {orderDetail?.sale_date || "-"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GoPackage className="w-4 h-4" />
                  <span>Invoice #{orderDetail?.invoice_no || "-"}</span>
                </div>
                <div className="text-green-700 bg-green-100">Processing</div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Invoice Card ===== */}
        <section className="mt-10">
          <div className="bg-white border shadow-sm rounded-xl">
            {/* Header */}
            <div className="flex flex-col gap-3 px-6 pt-6 md:flex-row md:items-center md:justify-between lg:justify-between xl:justify-between">
              <div className="text-sm">
                <p>
                  <span className="text-gray-500">Invoice No:</span>{" "}
                  <span className="font-medium">
                    {orderDetail?.invoice_no || "-"}
                  </span>
                </p>
                <p>
                  <span className="text-gray-500">Date:</span>{" "}
                  <span className="font-medium">
                    {orderDetail?.sale_date || "-"}
                  </span>
                </p>
                <p>
                  <span className="text-gray-500">Payment:</span>{" "}
                  <span className="font-medium">
                    {payLabel(orderDetail?.payment_method)}
                  </span>
                </p>
              </div>
            </div>

            {/* Addresses */}
            <div className="grid grid-cols-1 gap-6 px-6 mt-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
              <div className="space-y-1 text-sm">
                <h3 className="font-semibold text-gray-800">From</h3>
                <p className="text-gray-700">Laxin</p>
                <p className="text-gray-700">{contactInfo?.phone || "-"}</p>
                <p className="text-gray-700">{contactInfo?.email || ""}</p>
                <p className="w-64 text-gray-700">
                  {contactInfo?.address || "-"}
                </p>
              </div>
              <div className="space-y-1 text-sm">
                <h3 className="font-semibold text-gray-800">
                  Billing / Customer
                </h3>
                <p className="text-gray-700">{orderDetail?.name || "-"}</p>
                <p className="text-gray-700">{orderDetail?.phone || "-"}</p>
                <p className="text-gray-700">
                  {orderDetail?.information || "-"}
                </p>
              </div>
            </div>

            {/* Items Table */}
            <div className="px-6 mt-6 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-gray-600 border-b bg-gray-50">
                    <th className="px-3 py-3 font-medium text-left">Item</th>
                    <th className="px-3 py-3 font-medium text-left">SKU</th>
                    <th className="px-3 py-3 font-medium text-center">Qty</th>
                    <th className="px-3 py-3 font-medium text-right">
                      Unit Price
                    </th>
                    <th className="px-3 py-3 font-medium text-right">
                      Discount
                    </th>
                    <th className="px-3 py-3 font-medium text-right">Tax</th>
                    <th className="px-3 py-3 font-medium text-right">
                      Line Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((row) => (
                    <tr key={row.id} className="border-b last:border-0">
                      <td className="px-3 py-3">
                        <div className="font-medium text-gray-900">
                          {row?.product?.product_name || "-"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {row?.product?.product_code}
                        </div>
                      </td>
                      <td className="px-3 py-3 text-gray-700">
                        {row?.product?.sku || "-"}
                      </td>
                      <td className="px-3 py-3 text-center text-gray-700">
                        {row?.qty}{" "}
                        {row?.unit?.unit_name ? (
                          <span className="text-gray-500">
                            ({row.unit.unit_name})
                          </span>
                        ) : null}
                      </td>
                      <td className="px-3 py-3 text-right text-gray-700">
                        {currency(row?.net_unit_price)}
                      </td>
                      <td className="px-3 py-3 text-right text-gray-700">
                        -{currency(row?.discount || 0)}
                      </td>
                      <td className="px-3 py-3 text-right text-gray-700">
                        {currency(row?.tax || 0)}
                      </td>
                      <td className="px-3 py-3 font-medium text-right text-gray-900">
                        {currency(row?.total)}
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-3 py-6 text-center text-gray-500"
                      >
                        No items found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="px-6 mt-6 mb-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                <div className="text-sm text-gray-600">
                  <p>
                    <span className="font-medium text-gray-800">Notes:</span>{" "}
                    Keep this invoice for your records. For support contact our
                    helpline.
                  </p>
                </div>
                <div className="w-full md:justify-self-end md:w-80">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Items</span>
                      <span className="font-medium text-gray-900">
                        {orderDetail?.item ?? 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Qty</span>
                      <span className="font-medium text-gray-900">
                        {orderDetail?.total_qty ?? 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium text-gray-900">
                        {currency(orderDetail?.total_price)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium text-gray-900">
                        {currency(orderDetail?.shipping_cost)}
                      </span>
                    </div>
                    {orderDetail?.coupon_discount ? (
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Coupon
                          {orderDetail?.coupon_type
                            ? ` (${orderDetail.coupon_type})`
                            : ""}
                          {orderDetail?.coupon_rate
                            ? ` - ${orderDetail.coupon_rate}`
                            : ""}
                        </span>
                        <span className="font-medium text-green-600">
                          -{currency(orderDetail?.coupon_discount)}
                        </span>
                      </div>
                    ) : null}
                    {Number(orderDetail?.total_tax || 0) > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span className="font-medium text-gray-900">
                          {currency(orderDetail?.total_tax)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 text-base border-t">
                      <span className="font-semibold text-gray-800">
                        Grand Total
                      </span>
                      <span className="font-semibold">
                        {currency(orderDetail?.grand_total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* keep original home button as well if you want (or remove since we added above) */}
        <Link className="flex justify-center mt-10 print:hidden" href={`/`}>
          <button className="px-4 py-2 text-base text-white bg-gray-800 rounded-md">
            Return to home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessful;
