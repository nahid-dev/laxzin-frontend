import React from 'react';
import SectionHeader from '../SectionHeader';
import ProductCard from '../ProductDetails/ProductCard';

const TrendingNowSection = ({trendingProducts}) => {
    return (
      <section className="py-8 md:py-12 lg:py-24">
        <div className="max-w-7xl mx-auto px-2 xl:px-0">
          <SectionHeader
            title="TRENDING NOW"
            subtitle="What's popular this season"
          />
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {trendingProducts?.slice(0, 5)?.map((item, index) => (
              <ProductCard
                key={index}
                item={item}
                showTrend={true}
                size="small"
              />
            ))}
          </div>
        </div>
      </section>
    );
};

export default TrendingNowSection;