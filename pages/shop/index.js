import CommonbgBanner from '@/Components/Common/CommonbgBanner'
import React, { useEffect, useRef, useState } from "react";
import RightMenu from "@/Components/Shop/RightMenu";
import FilterSidebar from "@/Components/Shop/FilterSidebar";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";
import useSWR from "swr";
import request from "@/lib/request";

const fetcher = (url) => request(url);

const Shop = () => {
  const router = useRouter();
  const slug = router?.query?.slug;
  const [products, setProducts] = useState([]);
  const { ref, inView } = useInView();
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(1);
  const loadingMoreRef = useRef(false);

  const [filters, setFilters] = useState({
    price: { min: 0, max: 8000 },
    brands: [],
    categories: [],
  });

  const { data: categoryData, isLoading: categoryLoading } = useSWR(
    "get-categories",
    fetcher,
    { revalidateOnFocus: false }
  );
  const popularProducts = categoryData?.popular_products || [];

  const loadMoreUsers = async () => {
    if (loadingMoreRef.current) return;
    if (!slug) return;
    if (products.length >= totalData) return;

    loadingMoreRef.current = true;
    try {
      const nextPage = page + 1;
      const res = await request(
        `featured-products/${encodeURIComponent(
          String(slug)
        )}?page=${nextPage}&min_price=${filters.price.min}&max_price=${
          filters.price.max
        }&brands=${filters.brands.join(
          ","
        )}&categories=${filters.categories.join(",")}`
      );

      const newItems = res?.data?.data ?? [];
      setProducts((prev) => prev.concat(newItems));
      setTotalData(Number(res?.data?.total || totalData));
      setPage(nextPage);
    } finally {
      loadingMoreRef.current = false;
    }
  };

  useEffect(() => {
    if (inView) loadMoreUsers();
  }, [inView]);

  const handleFilterChange = (newFilters) => {
    const priceChanged =
      newFilters.price.min !== filters.price.min ||
      newFilters.price.max !== filters.price.max;

    const categoriesChanged =
      newFilters.categories.length !== filters.categories.length ||
      newFilters.categories.some((c, i) => c !== filters.categories[i]);

    if (priceChanged || categoriesChanged) {
      setFilters(newFilters);
      setPage(1);
      setProducts([]);
      setTotalData(0);
      loadingMoreRef.current = false;
    }
  };
  return (
    <div>
      {/* <CommonbgBanner name={`shop`} /> */}
      <div className="relative bg-black text-white py-10 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white/10 rotate-45"></div>
          <div className="absolute top-20 right-20 w-24 h-24 border border-white/20 rotate-12"></div>
          <div className="absolute bottom-10 left-1/4 w-16 h-16 bg-white/5 rotate-45"></div>
          <div className="absolute bottom-20 right-1/3 w-20 h-20 border border-white/15 -rotate-12"></div>

          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/30"></div>
              <div className="mx-4 w-2 h-2 bg-white rotate-45"></div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/30"></div>
            </div>

            <h1 className="text-6xl md:text-8xl font-light tracking-[0.2em] mb-6 relative text-white">
              SHOP
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
            </h1>

            <p className="text-xl md:text-2xl font-light text-gray-300 max-w-2xl mx-auto leading-relaxed tracking-wide">
              Discover our premium collection of natural beauty products crafted
              for your daily routine
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </div>

      <div className="mx-auto max-w-7xl px-2 lg:px-0">
        <div className="grid grid-cols-12 gap-6 py-10 md:gap-10">
          <div className="bg-white text-black md:col-span-3 md:block hidden">
            <FilterSidebar
              categories={categoryData?.laxzin_published_category}
              loading={categoryLoading}
              minPrice={0}
              maxPrice={8000}
              onChange={handleFilterChange}
            />
          </div>
          <div className="md:col-span-9 col-span-full">
            <RightMenu products={popularProducts} isLoading={categoryLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;

