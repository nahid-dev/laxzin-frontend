import Image from "next/image";
import React from "react";

import { RiCheckboxCircleFill } from "react-icons/ri";
import ProductBenefits from "./ProductBenefits";
import Button from "../Common/Button";

const ProductContentSection = ({ data }) => {
  return (
    <div>
      {/* Skin Concern Hero Section */}
      <div className="relative bg-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-0">
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-8 items-center">
            <div>
              <Image
                src="/image/placeholder.png"
                height={720}
                width={720}
                alt="Skin transformation"
                className="w-full rounded-lg"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                IS YOUR SKIN LOOKING DULL, OILY, OR DARKENED? HAS POLLUTION AND
                SUN EXPOSURE REDUCED YOUR NATURAL GLOW?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Why Choose Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                WHY SHOULD YOU CHOOSE BIOCARE VITAMIN C WHITENING FACIAL WASH
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">
                    <RiCheckboxCircleFill />
                  </span>
                  <span className="text-gray-700">
                    Suitable for all skin types
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">
                    <RiCheckboxCircleFill />
                  </span>
                  <span className="text-gray-700">
                    Smooth skin brightening with Vitamin C
                  </span>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Removes dirt and excess oil, enhances brightness, and keeps your
                skin feeling refreshed.
              </p>
            </div>
            <div>
              <Image
                src="/image/placeholder.png"
                height={720}
                width={720}
                alt="Skin transformation"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Who Can Use Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/image/placeholder.png"
                height={720}
                width={720}
                alt="Skin transformation"
                className="w-full rounded-lg"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                WHO CAN USE
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">
                    <RiCheckboxCircleFill />
                  </span>
                  <span className="text-gray-700">
                    Individuals with oily combination or pigmented skin
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">
                    <RiCheckboxCircleFill />
                  </span>
                  <span className="text-gray-700">
                    Those experiencing stubborn dark spots or uneven skin tone
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      <div className="pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-0">
          <h2 className="text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-12">
            HOW TO USE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center space-x-4">
                <div className="relative flex-shrink-0 w-20 h-20">
                  <Image
                    src="/image/placeholder.png"
                    height={420}
                    width={420}
                    alt="Wet your face"
                    className="rounded-lg object-cover"
                  />
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">Wet your face</p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center space-x-4">
                <div className="relative flex-shrink-0 w-20 h-20">
                  <Image
                    src="/image/placeholder.png"
                    height={420}
                    width={420}
                    alt="Wet your face"
                    className="rounded-lg object-cover"
                  />
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">
                    Take a small amount of face wash and work it into a lather
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center space-x-4">
                <div className="relative flex-shrink-0 w-20 h-20">
                  <Image
                    src="/image/placeholder.png"
                    height={420}
                    width={420}
                    alt="Wet your face"
                    className="rounded-lg object-cover"
                  />
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">
                    Gently massage your face for 30-40 seconds
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center space-x-4">
                <div className="relative flex-shrink-0 w-20 h-20">
                  <Image
                    src="/image/placeholder.png"
                    height={420}
                    width={420}
                    alt="Wet your face"
                    className="rounded-lg object-cover"
                  />
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">
                    Rinse thoroughly with clean water
                  </p>
                </div>
              </div>
            </div>

            {/* Step 5 - Frequency */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 md:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-4">
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-100 to-blue-100 rounded-lg flex items-center justify-center">
                    <div className="flex space-x-1">
                      <span className="text-2xl">☀️</span>
                      <span className="text-2xl">🌙</span>
                    </div>
                  </div>
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    5
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">
                    For best results, use every morning and night
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Tips Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-0 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            TIPS
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg tracking-wide">
            For even better results, use together with BioCore Vitamin C
            Whitening Cream.
          </p>
        </div>
      </div>
      {/* Before & After Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-0">
          <h2 className="text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-12">
            BEFORE & AFTER
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div>
                <Image
                  src="/image/placeholder.png"
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
                  src="/image/placeholder.png"
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
            <Button>Order Now</Button>
            <p className="mx-auto max-w-3xl text-gray-600 mt-5">
              Keep your skin clean, fresh, and bright with Cosrx Salicylic Acid
              Daily Gentle Cleanser. Experience the power of natural ingredients
              for radiant, healthy skin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductContentSection;
