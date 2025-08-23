import CommonbgBanner from "@/Components/Common/CommonbgBanner";
import Custom404 from "@/Components/Common/Custom404";
import ProductCard from "@/Components/ProductDetails/ProductCard";
import FilterSidebar from "@/Components/Shop/FilterSidebar";
import request from "@/lib/request";

import { useRouter } from "next/router";
import React, { useEffect, useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";

const ProductList = () => {
  const router = useRouter();
  const { ref, inView } = useInView();

  const [products, setProducts] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState({ price: { min: 0, max: 8000 } });

  // main fetch function
  const fetchProducts = useCallback(
    async (pageToLoad = 1, append = false) => {
      if (!router.query.slug) return;
      setLoading(true);

      try {
        const res = await request(
          `category-wise-product/${router.query.slug}?page=${pageToLoad}&product_name=${searchValue}`
        );

        const newProducts = res?.data?.data || [];
        setTotalData(res?.data?.total || 0);

        setProducts((prev) =>
          append ? [...prev, ...newProducts] : newProducts
        );
        setPage(pageToLoad);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    },
    [router.query.slug, searchValue]
  );

  // reload when category/search changes
  useEffect(() => {
    setProducts([]);
    setPage(1);
    if (router.query.slug) {
      fetchProducts(1, false);
    }
  }, [router.query.slug, searchValue, fetchProducts]);

  // infinite scroll trigger
  useEffect(() => {
    if (inView && products.length < totalData && !loading) {
      fetchProducts(page + 1, true);
    }
  }, [inView, products.length, totalData, page, loading, fetchProducts]);

  const handleInputChange = (val) => setSearchValue(val);
  const handleFilterChange = (newFilters) => setFilters(newFilters);

  return (
    <div>
      <CommonbgBanner
        name={`${router?.query?.slug}`}
        enableSearch={false}
        searchValue={searchValue}
        onInputChange={handleInputChange}
      />
      <div className="max-w-7xl px-2 lg:px-0 mx-auto py-8">
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          {/* SIDEBAR */}
          <div className="bg-white text-black md:col-span-3 md:block hidden">
            <FilterSidebar
              enableCategoryFilter={false}
              loading={loading}
              minPrice={0}
              maxPrice={8000}
              onChange={handleFilterChange}
              activeFilters={filters}
            />
          </div>

          {/* PRODUCT LIST */}
          <div className="md:col-span-9 col-span-full">
            {loading && products.length === 0 ? (
              <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 sm:gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i}>
                    <div class="animate-pulse group border p-3 border-gray-200 rounded-lg">
                      <div class="rounded-b-none flex flex-col overflow-hidden">
                        <div class="relative group h-72 xs:h-80 overflow-hidden rounded-xl">
                          <div class="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 h-4 bg-gray-200 rounded w-1/4"></div>
                          <div class="absolute top-2 right-2 z-10 h-4 bg-gray-200 rounded w-1/4"></div>
                          <div class="h-full w-full bg-gray-200"></div>
                        </div>
                        <div class="flex-1 mt-1 space-y-2">
                          <div class="h-4 bg-gray-200 rounded w-full"></div>
                          <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                          <div class="font-semibold text-black space-x-2 mb-2 md:mb-3">
                            <div class="h-4 bg-gray-200 rounded w-1/2 inline-block"></div>
                            <div class="h-4 bg-gray-200 rounded w-1/2 inline-block"></div>
                          </div>
                        </div>
                      </div>
                      <div class="w-full py-2 xs:py-3 bg-gray-200 rounded-md"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 sm:gap-6">
                  {products.map((item, index) => (
                    <ProductCard key={index} item={item} />
                  ))}
                </div>
                {/* Infinite loader trigger */}
                {products.length < totalData && (
                  <div
                    ref={ref}
                    className="text-black flex justify-center mt-4"
                  >
                    <svg
                      className="fill-current text-primary animate-spin h-7 w-7"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 28 28"
                    >
                      <path d="M12 2C12.5523 2 13 2.44772 13 3V6C13 6.55228 12.5523 7 12 7C11.4477 7 11 6.55228 11 6V3C11 2.44772 11.4477 2 12 2ZM12 17C12.5523 17 13 17.4477 13 18V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V18C11 17.4477 11.4477 17 12 17ZM22 12C22 12.5523 21.5523 13 21 13H18C17.4477 13 17 12.5523 17 12C17 11.4477 17.4477 11 18 11H21C21.5523 11 22 11.4477 22 12ZM7 12C7 12.5523 6.55228 13 6 13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H6C6.55228 11 7 11.4477 7 12ZM19.0711 19.0711C18.6805 19.4616 18.0474 19.4616 17.6569 19.0711L15.5355 16.9497C15.145 16.5592 15.145 15.9261 15.5355 15.5355C15.9261 15.145 16.5592 15.145 16.9497 15.5355L19.0711 17.6569C19.4616 18.0474 19.4616 18.6805 19.0711 19.0711ZM8.46447 8.46447C8.07394 8.85499 7.44078 8.85499 7.05025 8.46447L4.92893 6.34315C4.53841 5.95262 4.53841 5.31946 4.92893 4.92893C5.31946 4.53841 5.95262 4.53841 6.34315 4.92893L8.46447 7.05025C8.85499 7.44078 8.85499 8.07394 8.46447 8.46447ZM4.92893 19.0711C4.53841 18.6805 4.53841 18.0474 4.92893 17.6569L7.05025 15.5355C7.44078 15.145 8.07394 15.145 8.46447 15.5355C8.85499 15.9261 8.85499 16.5592 8.46447 16.9497L6.34315 19.0711C5.95262 19.4616 5.31946 19.4616 4.92893 19.0711ZM15.5355 8.46447C15.145 8.07394 15.145 7.44078 15.5355 7.05025L17.6569 4.92893C18.0474 4.53841 18.6805 4.53841 19.0711 4.92893C19.4616 5.31946 19.4616 5.95262 19.0711 6.34315L16.9497 8.46447C16.5592 8.85499 15.9261 8.85499 15.5355 8.46447Z" />
                    </svg>
                  </div>
                )}
              </>
            ) : (
              <Custom404 />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
