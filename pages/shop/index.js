import CommonbgBanner from "@/Components/Common/CommonbgBanner";
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
  const [searchValue, setSearchValue] = useState("");

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

  const handleInputChange = (val) => setSearchValue(val);
  return (
    <div>
      <CommonbgBanner
        name={`shop`}
        helperText={`Discover our premium collection of natural beauty products crafted for your daily routine`}
        enableSearch={true}
        searchValue={searchValue}
        onInputChange={handleInputChange}
      />

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
