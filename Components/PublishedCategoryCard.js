import { imageHostName } from '@/lib/config';
import Image from 'next/image';
import React, { useState } from 'react'

const PublishedCategoryCard = ({ item }) => {
  const [isOptimizedImage, setIsOptimizedImage] = useState(true);
  return (
    <div className="my-2 relative md:h-[160px] md:w-[160px] sm:w-[90px] sm:h-[100px] w-[70px] h-[50px] mx-auto">
      <Image
        className="h-full w-full object-contain"
        src={
          isOptimizedImage
            ? `${imageHostName}/storage/${item?.image_path}${item?.image}`
            : "/assets/placeholder_600x.webp"
        }
        width={100}
        height={100}
        priority
        alt="category"
        unoptimized={!isOptimizedImage}
        onError={() => setIsOptimizedImage(false)}
      />
    </div>
  );
};

export default PublishedCategoryCard