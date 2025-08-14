import React from "react";
import SectionHeader from "../SectionHeader";
import Image from "next/image";
import Button from "../Common/Button";

const OurStorySection = () => {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-2 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <SectionHeader title="OUR STORY" className="text-left mb-8" />
            <p className="text-gray-600 text-base sm:text-lg font-light leading-relaxed mb-6 sm:mb-8">
              Born from a passion for natural beauty, Laxzin combines ancient
              wisdom with modern science. Our journey began with a simple
              belief: nature holds the key to radiant skin and healthy hair.
            </p>
            <p className="text-gray-600 text-base sm:text-lg font-light leading-relaxed mb-6 sm:mb-8">
              Every product is crafted with carefully sourced ingredients,
              ensuring purity and effectiveness that you can trust. We're
              committed to sustainable beauty that honors both you and the
              planet.
            </p>
            <Button>LEARN MORE</Button>
          </div>
          <div className="order-1 lg:order-2">
            <Image
              src="/image/placeholder.png"
              height={720}
              width={720}
              alt="Our Story"
              className="w-full h-64 sm:h-96 lg:h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
