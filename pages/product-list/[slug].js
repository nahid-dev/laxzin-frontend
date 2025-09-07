import Button from "@/Components/Common/Button";
import CommonbgBanner from "@/Components/Common/CommonbgBanner";
import Custom404 from "@/Components/Common/Custom404";
import ProductCard from "@/Components/ProductDetails/ProductCard";
import request from "@/lib/request";

import { useRouter } from "next/router";
import React, { useEffect, useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ProductList = () => {
  const router = useRouter();
  const { ref, inView } = useInView();

  const [products, setProducts] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState({ minPrice: 0, maxPrice: 8000 });

  const clamp = (val, lo, hi) => {
    const num = Number(val);
    if (isNaN(num)) return lo;
    return Math.min(Math.max(num, lo), hi);
  };

  const fetchProducts = useCallback(
    async (pageToLoad = 1, append = false) => {
      if (!router.query.slug) return;
      setLoading(true);

      const query = `category-wise-product/${router.query.slug}?page=${pageToLoad}&product_name=${searchValue}&min_price=${filters.minPrice}&max_price=${filters.maxPrice}`;

      try {
        const res = await request(query);
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
    [router.query.slug, searchValue, filters]
  );

  // Reload when category/search/filters change
  useEffect(() => {
    setProducts([]);
    setPage(1);
    if (router.query.slug) {
      fetchProducts(1, false);
    }
  }, [router.query.slug, fetchProducts]);

  // Infinite scroll
  useEffect(() => {
    if (inView && products.length < totalData && !loading) {
      fetchProducts(page + 1, true);
    }
  }, [inView, products.length, totalData, page, loading, fetchProducts]);

  const handleInputChange = (val) => setSearchValue(val);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({
      minPrice: newFilters.minPrice ?? prev.minPrice,
      maxPrice: newFilters.maxPrice ?? prev.maxPrice,
    }));
  };

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
            <div className="sticky top-[12vh] bg-gray-50 p-6 rounded-lg">
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 tracking-wide">
                  PRICE RANGE
                </h3>
                <section aria-labelledby="price-heading">
                  <div className="grid grid-cols-2 gap-2 mb-1">
                    <div>
                      <label className="block mb-1 text-gray-600">Min</label>
                      <input
                        type="number"
                        className="w-full px-2 py-1 text-sm bg-white border border-gray-300 rounded"
                        value={filters.minPrice}
                        min={0}
                        max={filters.maxPrice}
                        onChange={(e) =>
                          setFilters((p) => ({
                            ...p,
                            minPrice: clamp(e.target.value, 0, p.maxPrice),
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-gray-600">Max</label>
                      <input
                        type="number"
                        className="w-full px-2 py-1 text-sm bg-white border border-gray-300 rounded"
                        value={filters.maxPrice}
                        min={filters.minPrice}
                        max={8000}
                        onChange={(e) =>
                          setFilters((p) => ({
                            ...p,
                            maxPrice: clamp(e.target.value, p.minPrice, 8000),
                          }))
                        }
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min={filters.minPrice}
                    max={8000}
                    value={filters.maxPrice}
                    onChange={(e) =>
                      setFilters((p) => ({
                        ...p,
                        maxPrice: clamp(e.target.value, p.minPrice, 8000),
                      }))
                    }
                    className="w-full accent-gray-400 border-none bg-gray-200"
                  />
                  <div className="flex justify-between mt-1 text-gray-600">
                    <span>{filters.minPrice}</span>
                    <span>{filters.maxPrice}+</span>
                  </div>
                  <Button
                    type="button"
                    onClick={() => handleFilterChange(filters)}
                    className="mt-5 w-full font-normal"
                  >
                    Apply Filters
                  </Button>
                </section>
              </div>
            </div>
          </div>

          {/* PRODUCT LIST */}
          <div className="md:col-span-9 col-span-full">
            {loading && products.length === 0 ? (
              <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 sm:gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i}>
                    <div className="animate-pulse group border p-3 border-gray-200 rounded-lg">
                      <div className="rounded-b-none flex flex-col overflow-hidden">
                        <div className="relative group h-72 xs:h-80 overflow-hidden rounded-xl bg-gray-200"></div>
                        <div className="flex-1 mt-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          <div className="font-semibold text-black space-x-2 mb-2 md:mb-3">
                            <div className="h-4 bg-gray-200 rounded w-1/2 inline-block"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 inline-block"></div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full py-2 xs:py-3 bg-gray-200 rounded-md"></div>
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
                    <AiOutlineLoading3Quarters className="animate-spin h-7 w-7 text-primary" />
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
