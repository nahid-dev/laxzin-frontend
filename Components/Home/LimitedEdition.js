import React from 'react';
import ProductCard from '../ProductDetails/ProductCard';
import SectionHeader from '../SectionHeader';

const LimitedEdition = ({limitedEdition}) => {
    return (
      <section className="py-8 md:py-12 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-2 xl:px-0">
          <SectionHeader
            title="LIMITED EDITION"
            subtitle="Exclusive products available for a limited time"
          />
          <div className="grid grid-cols-2 xm:grid-cols-2 md:grid-cols-3 gap-8">
            {limitedEdition?.slice(0, 3)?.map((item, index) => (
              <ProductCard key={index} item={item} />
            ))}
          </div>
        </div>
      </section>
    );
};

export default LimitedEdition;