import React from "react";
import SectionHeader from "../SectionHeader";
import ProductCard from "../ProductDetails/ProductCard";

const BestSellersSection = ({ bestSellers, loading }) => {
  return (
    <section className="py-8 md:py-12 lg:py-24">
      <div className="max-w-7xl mx-auto px-2 md:px-0">
        <SectionHeader
          title="BEST SELLERS"
          subtitle="Customer favorites at special prices"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            <div>Loading...</div>
          ) : (
            bestSellers?.slice(0,4)?.map((item, index) => (
              <ProductCard key={index} item={item} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default BestSellersSection;
