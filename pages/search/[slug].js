

import CommonbgBanner from "@/Components/Common/CommonbgBanner";
import ProductCard from "@/Components/ProductDetails/ProductCard";
import request from "@/lib/request";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

const Search = () => {
  const router = useRouter();
  const { slug } = router?.query;
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (slug && typeof slug === "string") {
      setSearchValue(slug);
    }
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const encoded = encodeURIComponent(slug);
        const res = await request(`search/product?product_name=${encoded}`);
        setData(res?.data || []);
      } catch (err) {
        console.log("Error fetching data:", err?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  const handleSearchInputChange = (val) => {
    setSearchValue(val);
    router.push(`/search/${encodeURIComponent(val)}`, undefined, {
      shallow: true,
    });
  };

  return (
    <>
      {/* Banner section */}
      <CommonbgBanner
        name={"Search Product"}
        helperText={"Find your desire product with one search"}
        searchValue={searchValue}
        onInputChange={handleSearchInputChange}
        enableSearch={true}
      />
      <div className="max-w-7xl mx-auto px-2 sm:px-0 text-black">
        <div className="xl:max-w-[70rem] lg:max-w-[65rem] md:max-w-[50rem] sm:max-w-[36rem] max-w-[15rem] mx-auto">
          <div className="px-2 py-4">
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: "170px",
                }}
              >
                {" "}
                <ThreeDots
                  height="80"
                  width="80"
                  radius="9"
                  color="#1F2937"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  visible={true}
                />
              </div>
            ) : (
              <div>
                {data?.length > 0 ? (
                  <>
                    <div className="grid  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 xls:gap-3 xms:gap-3 xs:gap-3">
                      {data?.map((item, index) => (
                        <div key={index}>
                          <ProductCard item={item} />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="mt-20">
                    <p className="text-3xl text-center font-semibold text-black tracking-wider">
                      No Data found
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
