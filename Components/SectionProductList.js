import { imageHostName } from '@/lib/config';
import Image from 'next/image';
import React, { useState } from 'react'

const SectionProductList = ({item}) => {
 
    const [isOptimizedImage, setIsOptimizedImage] = useState(true);

  return (
    <>
      <div>
        <Image
          src={
            isOptimizedImage
              ? `${imageHostName}/storage/${item?.image_path}${item?.image[0]}`
              : "/assets/placeholder_600x.webp"
          }
          height={150}
          width={150}
          className="mx-auto h-full w-full object-contain"
          alt='product'
          unoptimized={!isOptimizedImage}
          onError={() => setIsOptimizedImage(false)}
        />
      </div>
      <div>
        <p className="sm:text-xl xs:text-lg text-base font-semibold text-black">
          {item?.product_name}
        </p>

        <div className="py-2">
          <span
            className="text-black"
            dangerouslySetInnerHTML={{ __html: item?.guide_line }}
          ></span>
        </div>

        <div className=" text-black font-semibold text-2xl pt-2">
          ৳{" "}
          {item?.product_variation_status == 0 ? (
            <>
              {item?.regular_price == item?.sale_price ? null : (
                <span className="line-through">
                  {Math.round(item?.regular_price)}
                </span>
              )}
            </>
          ) : (
            <>
              {item?.product_variants[0]?.regular_price ==
              item?.product_variants[0]?.sale_price ? null : (
                <span className="line-through">
                  {Math.round(item?.product_variants[0]?.regular_price)}
                </span>
              )}
            </>
          )}
          {item?.product_variation_status == 0 ? (
            <span className="pl-2 text-black">
              {Math.round(item?.sale_price)}
            </span>
          ) : (
            <span className="pl-2 text-black">
              {Math.round(item?.product_variants[0]?.sale_price)}
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default SectionProductList