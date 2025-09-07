import React from "react";
import SectionHeader from "../SectionHeader";
import ProductCard from "../ProductDetails/ProductCard";
import SlideWrapper from "../Common/SlideWrapper";

const BestSellersSection = ({ bestSellers, loading }) => {
  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-2 xl:px-0">
        <SectionHeader
          title="BEST SELLERS"
          subtitle="Customer favorites at special prices"
        />
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <SlideWrapper slideData={bestSellers} />
          )}
        </div>
      </div>
    </section>
  );
};

export default BestSellersSection;
