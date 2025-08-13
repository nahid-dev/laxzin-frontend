import React from 'react';

const TestComponent = () => {
    return (
        <>
         {prod?.length > 0 &&
            prod?.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between py-3">
                  <div className="text-[18px] uppercase font-semibold border-b border-pink-200 cursor-pointer xs:text-[14px] xms:text-[14px] xls:text-[14px] sm:text-[16px]">
                    {item?.name}{" "}
                    <span className="text-[14px] hidden lg:inline xl:inline xxl:inline font-medium text-gray-500 xs:text-[10px] xms:text-[10px] xls:text-[10px] sm:text-[12px]">
                      {" "}
                      {item?.meta_name}
                    </span>
                  </div>
                  <Link
                    href={`/category/${item?.slug}`}
                    className="z-10 cursor-pointer animate-bounce"
                  >
                    <>
                      <div className="relative flex items-center flex-column group">
                        <span className="mr-2 font-medium text-tahiti-500">View All</span>
                        <MdOutlineDoubleArrow className="text-[26px] text-tahiti-500" />
                        <div className="absolute left-[-60px] top-[30px] hidden flex items-baseline  ml-2 group-hover:flex ">
                          <span className=" text-white px-2 py-1 w-[120px] bg-tahiti-500 border-2 border-[#f36eae]   rounded-md  hover:shadow-2xl hover:shadow-gray-500/50">
                            Click for more
                          </span>
                        </div>
                      </div>
                    </>
                  </Link>
                </div>
                <div className="grid items-stretch grid-cols-2 gap-4">
                    {/* 🔹 Left Banner */}
                    <div className="col-span-1 overflow-hidden rounded-lg">
                      <div className="w-full h-full max-h-[390px]">
                        <img
                          src="https://cdn.beautybooth.com.bd/uploads/all/j-beauty-feature-cover_52.webp"
                          alt="Banner"
                          className="object-cover w-full h-full rounded-lg"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* 🔹 Right Column: 3 Product Cards beside banner */}
                    <div className="grid grid-cols-3 col-span-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:col-span-3">
                      {item?.section_product_list?.slice(0, 3).map((product, index) => (
                        <ProductCardNew2 key={index} product={product} />
                      ))}
                    </div>
                  </div>

                  {item?.section_product_list?.length > 3 && (
                    <div className="mt-6">
                      <ProductCard productList={item?.section_product_list?.slice(3)} />
                    </div>
                  )}
              </div>
            ))}   
        </>
    );
};

export default TestComponent;