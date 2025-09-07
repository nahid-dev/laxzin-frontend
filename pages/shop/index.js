import CommonbgBanner from "@/Components/Common/CommonbgBanner";
import React, { useEffect, useRef, useState } from "react";
import RightMenu from "@/Components/Shop/RightMenu";
import FilterSidebar from "@/Components/Shop/FilterSidebar";
import { useInView } from "react-intersection-observer";
import useSWR from "swr";
import request from "@/lib/request";

const fetcher = (url) => request(url);

const Shop = () => {
  const [products, setProducts] = useState([]);
  const { ref, inView } = useInView();
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(1);
  const loadingMoreRef = useRef(false);
  const [searchValue, setSearchValue] = useState("");

  const [filters, setFilters] = useState({
    price: { min: 0, max: 8000 },
    categories: [],
  });

  // Fetch categories
  const { data: categoryData, isLoading: categoryLoading } = useSWR(
    "get-categories",
    fetcher,
    { revalidateOnFocus: false }
  );

  // Function to build API query string
  const buildQuery = (pageNum = 1) => {
    const categoryString = filters.categories;
    return `get-all-product?page=${pageNum}&min_price=${
      filters.minPrice
    }&max_price=${
      filters.maxPrice
    }&categories=${categoryString}&product_name=${encodeURIComponent(
      searchValue
    )}`;
  };

  // Fetch first page whenever filters or search change
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await request(buildQuery(1));
      const newItems = res?.new_arrival?.data ?? [];
      setProducts(newItems);
      setTotalData(Number(res?.data?.total || 0));
      setPage(1);
      loadingMoreRef.current = false;
    };

    fetchProducts();
  }, [searchValue, filters]);

  // Load more on scroll
  const loadMoreProducts = async () => {
    if (loadingMoreRef.current) return;
    if (products.length >= totalData) return;

    loadingMoreRef.current = true;

    try {
      const nextPage = page + 1;
      const res = await request(buildQuery(nextPage));
      const newItems = res?.data?.data ?? [];
      setProducts((prev) => prev.concat(newItems));
      setTotalData(Number(res?.data?.total || totalData));
      setPage(nextPage);
    } finally {
      loadingMoreRef.current = false;
    }
  };

  useEffect(() => {
    if (inView) loadMoreProducts();
  }, [inView]);

  // Handle filter changes from sidebar
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Handle search input
  const handleInputChange = (val) => setSearchValue(val);

  return (
    <div>
      <CommonbgBanner
        name="shop"
        helperText="Discover our premium collection of natural beauty products crafted for your daily routine"
        enableSearch={false}
        searchValue={searchValue}
        onInputChange={handleInputChange}
      />

      <div className="mx-auto max-w-7xl px-2 lg:px-0">
        <div className="grid grid-cols-12 gap-6 py-10 md:gap-10">
          {/* Sidebar */}
          <div className="bg-white text-black md:col-span-3 md:block hidden">
            <FilterSidebar
              categories={categoryData?.laxzin_published_category}
              loading={categoryLoading}
              minPrice={0}
              maxPrice={8000}
              onChange={handleFilterChange}
              activeFilters={filters}
            />
          </div>

          {/* Product list */}
          <div className="md:col-span-9 col-span-full">
            <RightMenu products={products} isLoading={false} />
            {/* Infinite scroll trigger */}
            <div ref={ref} className="h-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
