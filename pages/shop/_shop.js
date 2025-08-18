import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import SingleProduct from "@/components/productSection/SingleProduct";
import request from "@/lib/request";
import { useInView } from "react-intersection-observer";
import Head from "next/head";
import FilterSidebar from "@/components/FilterSidebar";
import useSWR from "swr";

const fetcher = (url) => request(url);

const ProductList = () => {
  const router = useRouter();
  const slug = router?.query?.slug;
  const [products, setProducts] = useState([]);
  const { ref, inView } = useInView();
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    price: { min: 0, max: 8000 },
    brands: [],
    categories: [],
  });

  const { data: brandData, isLoading: brandLoading } = useSWR(
    "get-brands",
    fetcher,
    { revalidateOnFocus: false }
  );

  const { data: categoryData, isLoading: categoryLoading } = useSWR(
    "get-categories",
    fetcher,
    { revalidateOnFocus: false }
  );

  const { data, isLoading } = useSWR(
    slug
      ? `featured-products/${encodeURIComponent(
          String(slug)
        )}?page=${page}&min_price=${filters.price.min}&max_price=${
          filters.price.max
        }&brands=${filters.brands.join(
          ","
        )}&categories=${filters.categories.join(",")}`
      : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (page === 1 && data?.data?.data) {
      setProducts(data.data.data);
      setTotalData(Number(data?.data?.total || 0));
    }
  }, [data, page]);

  const loadingMoreRef = useRef(false);

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

    const brandsChanged =
      newFilters.brands.length !== filters.brands.length ||
      newFilters.brands.some((b, i) => b !== filters.brands[i]);

    const categoriesChanged =
      newFilters.categories.length !== filters.categories.length ||
      newFilters.categories.some((c, i) => c !== filters.categories[i]);

    if (priceChanged || brandsChanged || categoriesChanged) {
      setFilters(newFilters);
      setPage(1);
      setProducts([]);
      setTotalData(0);
      loadingMoreRef.current = false;
    }
  };

  return (
    <>
      <Head>
        <script>{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NNCSPDMM');
        `}</script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NNCSPDMM"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
      </Head>

      <div className="min-h-[600px] bg-white pt-[170px] sm:pt-[130px] xls:pt-[120px] xms:pt-[120px] xs:pt-[120px] text-black">
        <div className="max-w-[85rem] mx-auto">
          <div className="flex items-center justify-between px-2 py-2">
            <p className="text-[18px] font-semibold uppercase">
              {router?.query?.slug}
            </p>
            <p className="font-sans text-sm ">{totalData} items</p>
          </div>

          <div className="grid grid-cols-12 gap-4 md:grid-cols-1 sm:grid-cols-1">
            <div className="hidden col-span-3 md:hidden lg:block xl:block">
              <FilterSidebar
                brands={brandData?.brands}
                categories={categoryData?.product_categories}
                loading={brandLoading || categoryLoading}
                minPrice={0}
                maxPrice={8000}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-span-9 md:col-span-12 sm:col-span-12 lg:col-span-9 xl:col-span-9 xls:col-span-12 xs:col-span-12">
              {products?.length > 0 ? (
                <div className="pb-6">
                  <div className="grid grid-cols-5 gap-3 xs:grid-cols-2 xms:grid-cols-3 xls:grid-cols-3 sm:grid-cols-3 md:grid-cols-3">
                    {products?.map((item, index) => (
                      <SingleProduct key={index} item={item} />
                    ))}
                  </div>

                  {products.length < totalData ? (
                    <div
                      ref={ref}
                      className="flex justify-center mt-2 text-black"
                    >
                      <svg
                        className="fill-current text-tahiti-500 animate-spin h-7 w-7"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 28 28"
                      >
                        <path d="M12 2C12.5523 2 13 2.44772 13 3V6C13 6.55228 12.5523 7 12 7C11.4477 7 11 6.55228 11 6V3C11 2.44772 11.4477 2 12 2ZM12 17C12.5523 17 13 17.4477 13 18V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V18C11 17.4477 11.4477 17 12 17ZM22 12C22 12.5523 21.5523 13 21 13H18C17.4477 13 17 12.5523 17 12C17 11.4477 17.4477 11 18 11H21C21.5523 11 22 11.4477 22 12ZM7 12C7 12.5523 6.55228 13 6 13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H6C6.55228 11 7 12.4477 7 12ZM19.0711 19.0711C18.6805 19.4616 18.0474 19.4616 17.6569 19.0711L15.5355 16.9497C15.145 16.5592 15.145 15.9261 15.5355 15.5355C15.9261 15.145 16.5592 15.145 16.9497 15.5355L19.0711 17.6569C19.4616 18.0474 19.4616 18.6805 19.0711 19.0711ZM8.46447 8.46447C8.07394 8.85499 7.44078 8.85499 7.05025 8.46447L4.92893 6.34315C4.53841 5.95262 4.53841 5.31946 4.92893 4.92893C5.31946 4.53841 5.95262 4.53841 6.34315 4.92893L8.46447 7.05025C8.85499 7.44078 8.85499 8.07394 8.46447 8.46447ZM4.92893 19.0711C4.53841 18.6805 4.53841 18.0474 4.92893 17.6569L7.05025 15.5355C7.44078 15.145 8.07394 15.145 8.46447 15.5355C8.85499 15.9261 8.85499 16.5592 8.46447 16.9497L6.34315 19.0711C5.95262 19.4616 5.31946 19.4616 4.92893 19.0711ZM15.5355 8.46447C15.145 8.07394 15.145 7.44078 15.5355 7.05025L17.6569 4.92893C18.0474 4.53841 18.6805 4.53841 19.0711 4.92893C19.4616 5.31946 19.4616 5.95262 19.0711 6.34315L16.9497 8.46447C16.5592 8.85499 15.9261 8.85499 15.5355 8.46447Z" />
                      </svg>
                    </div>
                  ) : null}
                </div>
              ) : isLoading ? (
                <div className="h-[400px] md:h-[200px] sm:h-[170px] lg:h-[300px] xls:h-[140px] xms:h-[130px] xs:h-[120px] flex items-center justify-center">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 h-8 border-4 border-pink-500 border-dashed rounded-full animate-spin"></div>
                    <span className="text-sm tracking-wide text-gray-500">
                      Loading, please wait...
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 space-y-4 text-center">
                  <svg
                    className="w-16 h-16 text-gray-400 animate-pulse"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v3m0 0v3m0-3h3m-3 0h-3"
                    />
                  </svg>
                  <span className="text-xl font-semibold text-gray-700">
                    No Products Found
                  </span>
                  <p className="text-sm text-gray-500">
                    We couldn't find any results matching your search. Try
                    adjusting your filters or search again.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
