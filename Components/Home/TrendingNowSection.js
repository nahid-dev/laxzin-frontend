import React from "react";
import SectionHeader from "../SectionHeader";
import ProductCard from "../ProductDetails/ProductCard";
import SlideWrapper from "../Common/SlideWrapper";

const TrendingNowSection = ({ trendingProducts = [] }) => {
  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-2 xl:px-0">
        <SectionHeader
          title="TRENDING NOW"
          subtitle="What's popular this season"
        />
        <div>
          {trendingProducts?.length > 0 ? (
            <SlideWrapper slideData={trendingProducts} />
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default TrendingNowSection;
