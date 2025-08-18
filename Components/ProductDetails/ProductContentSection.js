import Image from "next/image";
import React from "react";

import { RiCheckboxCircleFill } from "react-icons/ri";
import ProductBenefits from "./ProductBenefits";
import Button from "../Common/Button";
import { imageHostName } from "@/lib/config";

const ProductContentSection = ({ data }) => {
  return (
    <div>
      {/* Skin Concern Hero Section */}
      {data?.problem_headline && (
        <div className="relative bg-orange-50 py-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-0">
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-8 items-center">
              <div>
                <Image
                  src={`${imageHostName}/storage/product/${data?.problem_image}`}
                  height={720}
                  width={720}
                  alt="Skin transformation"
                  className="w-full rounded-lg"
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                  {data?.problem_headline}
                </h2>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Why Choose Section */}
      {data?.benefit_headline && (
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 lg:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  {data?.benefit_headline}
                </h2>
                <ul className="w-full max-w-md mx-auto mt-6 space-y-4 sm:mt-4 xls:mt-3">
                  {(Array.isArray(data?.reasons_data)
                    ? data.reasons_data
                    : String(data?.reasons_data ?? "")
                        .replace(/[\[\]"]/g, "")
                        .split(",")
                  ).map((txt, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <span className="text-green-500 text-xl">
                        <RiCheckboxCircleFill />
                      </span>
                      <span className="text-gray-700">{txt}</span>
                    </div>
                  ))}
                </ul>
                <div
                  className="px-6 mb-8 prose text-gray-600 prose-zinc prose-headings:font-semibold prose-p:my-3 prose-ul:my-3 prose-ol:my-3 prose-img:mx-auto"
                  dangerouslySetInnerHTML={{ __html: data?.description }}
                />
              </div>
              <div>
                <Image
                  src={`${imageHostName}/storage/product/${data?.benefit_image}`}
                  height={720}
                  width={720}
                  alt="Skin transformation"
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Who Can Use Section */}
      {data?.who_can_use_title && (
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 lg:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Image
                  src={`${imageHostName}/storage/product/${data?.who_can_use_image}`}
                  height={720}
                  width={720}
                  alt="Skin transformation"
                  className="w-full rounded-lg"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  {data?.who_can_use_title}
                </h2>
                <div className="space-y-4">
                  {Array.isArray(data?.who_can_use_data)
                    ? data.who_can_use_data
                    : String(data?.who_can_use_data ?? "")
                        .replace(/[\[\]"]/g, "")
                        .split(",")
                        ?.map((txt, i) => (
                          <div key={i} className="flex items-start space-x-3">
                            <span className="text-green-500 text-xl">
                              <RiCheckboxCircleFill />
                            </span>
                            <span className="text-gray-700">{txt}</span>
                          </div>
                        ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ingredients Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-0">
          <h2 className="text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-8">
            INGREDIENTS
          </h2>
          <div className="flex gap-4 items-center flex-wrap justify-start xs:justify-center mb-8">
            {data?.ingredient
              ?.replace(/<[^>]+>/g, "")
              ?.split(/,|\n/)
              ?.map((item, idx) => (
                <span
                  key={idx}
                  className="font-medium text-black border rounded-full text-sm bg-gray-50 px-5 py-1"
                >
                  {item.trim()}
                </span>
              ))}
          </div>
          <div className="justify-center flex">
            <ProductBenefits />
          </div>
        </div>
      </div>
      {/* How to Use Section */}
      {(() => {
        let steps = [];
        try {
          const raw = data?.how_to_use;
          steps = Array.isArray(raw)
            ? raw
            : typeof raw === "string" && raw.trim()
            ? JSON.parse(raw)
            : [];
        } catch (e) {
          steps = [];
        }

        return steps.length > 0 ? (
          <div className="pb-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 lg:px-0">
              <h2 className="text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-12">
                HOW TO USE
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {steps.map((step, idx) => {
                  const title = step?.title || `Step ${idx + 1}`;
                  return (
                    <div
                      key={idx}
                      className="flex gap-5 border border-gray-200 rounded-xl p-4 py-3"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="relative flex-shrink-0 size-24">
                          <Image
                            src={`${imageHostName}/storage/product/${encodeURIComponent(
                              step?.image ?? ""
                            )}`}
                            height={420}
                            width={420}
                            alt={title}
                            className="rounded-lg object-cover"
                          />
                          <div className="absolute -top-4 -left-4 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {idx + 1}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">{title}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {data?.tips?.length > 0 ? (
                <section className="px-24 mt-6 sm:px-8 xls:px-4">
                  <h2 className="text-xl font-bold tracking-tight text-center text-gray-800 uppercase sm:text-xl xls:text-lg">
                    Tips
                  </h2>
                  <p className="text-center xls:text-sm">{data?.tips}</p>
                </section>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          ""
        );
      })()}
      {/* Before & After Section */}
      {data?.before_image && (
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 lg:px-0">
            <h2 className="text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-12">
              BEFORE & AFTER
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div>
                  <Image
                    src={`${imageHostName}/storage/product/${data?.before_image}`}
                    height={720}
                    width={720}
                    alt="Skin transformation"
                    className="w-full rounded-lg"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">BEFORE</h3>
              </div>
              <div className="text-center">
                <div>
                  <Image
                    src={`${imageHostName}/storage/product/${data?.after_image}`}
                    height={720}
                    width={720}
                    alt="Skin transformation"
                    className="w-full rounded-lg"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">AFTER</h3>
              </div>
            </div>
            <div className="text-center mt-8">
              <Button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Order Now
              </Button>
              <p className="mx-auto max-w-3xl text-gray-600 mt-5">
                Keep your skin clean, fresh, and bright with Cosrx Salicylic
                Acid Daily Gentle Cleanser. Experience the power of natural
                ingredients for radiant, healthy skin.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductContentSection;
