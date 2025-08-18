import { useStatus } from "@/context/contextStatus";
import { imageHostName } from "@/lib/config";
import request from "@/lib/request";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import Button from "./Common/Button";
import Link from "next/link";

const SearchModal = () => {
  const { searchModal, setSearchModal } = useStatus();
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const debounceRef = useRef();

  useEffect(() => {
    if (!searchValue) {
      setData([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    // Debounce API call
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const encodedSlug = encodeURIComponent(searchValue);
        const res = await request(`search/product?product_name=${encodedSlug}`);
        setData(res?.data || []);
      } catch (err) {
        setData([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    // Cleanup on unmount
    return () => clearTimeout(debounceRef.current);
  }, [searchValue]);

  useEffect(() => {
    if (searchModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchModal]);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setData([]);
  };

  const handleClose = () => {
    setSearchModal(false);
    setSearchValue("");
    setData([]);
  };
  const handleViewAllResult = () => {
    setSearchModal(false);
    router.push(`/search/${searchValue}`);
  };

  return (
    <>
      {searchModal && (
        <div className="fixed top-0 left-0 h-screen w-full z-50 md:bg-[#fffffff2] bg-[#25201ef2] text-black">
          <div className="px-3 pt-8 mx-4">
            <div className="flex justify-end items-center">
              <div onClick={handleClose} className="cursor-pointer">
                <svg
                  className="fill-current md:text-black text-white h-10 w-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 28 28"
                  width="28"
                  height="28"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                </svg>
              </div>
            </div>

            <div className="pt-14 md:text-black text-white">
              <div>
                <p className="md:text-2xl text-lg tracking-[6px] text-center">
                  WHAT YOU ARE LOOKING FOR?
                </p>
                <div className="flex justify-center pt-10 w-full max-w-2xl mx-auto relative">
                  <input
                    placeholder="Search by keywords"
                    className="w-full bg-transparent outline-none placeholder:text-sm md:placeholder:text-black placeholder:text-white border-b placeholder:font-light border-gray-200"
                    type="text"
                    value={searchValue}
                    onChange={handleInputChange}
                  />
                  {searchValue && (
                    <div
                      onClick={handleClearSearch}
                      className="absolute right-0 flex items-center gap-1 cursor-pointer"
                    >
                      <IoIosCloseCircle />
                      <span>Clear</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-2xl mt-8 h-[60vh] overflow-y-auto">
            <div>
              <h2 className="text-lg font-light">
                Search Result{" "}
                {searchValue ? <span>({data.length})</span> : null}
              </h2>
            </div>
            <div>
              {loading ? (
                <div>Loading...</div>
              ) : data?.length > 0 ? (
                <div className="flex flex-col gap-5 divide-y">
                  {data?.slice(0, 10)?.map((product, index) => (
                    <Link
                      href={`/product/${product?.slug}`}
                      onClick={() => {
                        setSearchModal(false);
                        setSearchValue("");
                        setData([]);
                      }}
                      className="flex gap-3 md:gap-5 pt-3 group"
                      key={product?.id || index}
                    >
                      <div className="overflow-hidden">
                        <div className="size-16 rounded overflow-hidden">
                          <Image
                            src={`${imageHostName}/storage/product/${encodeURIComponent(
                              product?.image[0]
                            )}`}
                            width={420}
                            height={420}
                            alt="Product Image"
                            className="object-fill group-hover:scale-125 duration-200 transition-all ease-in-out"
                          />
                        </div>
                      </div>
                      <div>
                        <h2 className="font-semibold">
                          {product?.product_name}
                        </h2>
                        <div className="text-sm flex gap-2">
                          <p>
                            ৳
                            {product?.product_variation_status == 0 ? (
                              <span className="pl-1 text-primary">
                                {Math.round(product?.sale_price)}
                              </span>
                            ) : (
                              <span className="pl-1 text-primary">
                                {Math.round(
                                  product?.product_variants[0]?.sale_price
                                )}
                              </span>
                            )}
                          </p>
                          <p>
                            {/* discount */}
                            {product?.product_variation_status == 0 ? (
                              <>
                                {product?.regular_price ==
                                product?.sale_price ? null : (
                                  <span className="line-through text-gray-600 font-normal text-sm">
                                    ৳ {Math.round(product?.regular_price)}
                                  </span>
                                )}
                              </>
                            ) : (
                              <>
                                {product?.product_variants[0]?.regular_price ==
                                product?.product_variants[0]
                                  ?.sale_price ? null : (
                                  <span className="line-through text-sm font-normal">
                                    ৳{" "}
                                    {Math.round(
                                      product?.product_variants[0]
                                        ?.regular_price
                                    )}
                                  </span>
                                )}
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                  {data?.length > 10 ? (
                    <div className="flex justify-center pt-3">
                      <Button
                        onClick={handleViewAllResult}
                        variant="secondary"
                        size="sm"
                      >
                        View All Results
                      </Button>
                    </div>
                  ) : null}
                </div>
              ) : searchValue ? (
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
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchModal;
