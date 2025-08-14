import Link from "next/link";

import { SlHandbag } from "react-icons/sl";

import { useStatus } from "@/context/contextStatus";
import { RxHamburgerMenu } from "react-icons/rx";
import TopNavbar from "./TopNavbar";
import { FaUserCircle } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { imageHostName } from "@/lib/config";
import Image from "next/image";
import { AiOutlineUser } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import Button from "@/Components/Common/Button";
import { usePathname } from "next/navigation";

const Navbar = ({ catData, contactInfo }) => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    setDrawerOpen,
    searchModal,
    setSearchModal,
    token,
    setToken,
    setUserId,
    setImage,
    setuserNo,
  } = useStatus();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const pathName = usePathname();
  const isHomePage = pathName === "/";

  const isDevelopment = process.env.NEXT_PUBLIC_MODE === "development";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // const search = (val) => {
  //   if (val !== "") {
  //     const encodedVal = encodeURIComponent(val);
  //     router.push(`/search/${encodedVal}`);
  //   } else {
  //     router.push(`/`);
  //   }
  // };

  const handleSearch = () => {
    setSearchModal((prev) => !prev);
  };

  const handleLogOut = () => {
    toast.success("Successfully logged out!");
    setToken(null);
    setUserId(null);
    setImage("");
    setuserNo("");
    destroyCookie({}, "token", {
      path: "/",
    });

    destroyCookie({}, "userId", {
      path: "/",
    });
    destroyCookie({}, "userNo", {
      path: "/",
    });
    destroyCookie({}, "image", {
      path: "/",
    });
    destroyCookie({}, "user", {
      path: "/",
    });

    router.push(`/`);
  };

  return (
    <div
      className={`w-full z-50 transition-all duration-300 ${
        isHomePage
          ? isScrolled
            ? "sticky top-0 bg-white/95 backdrop-blur-md"
            : "absolute top-0"
          : "sticky top-0 bg-white/95 backdrop-blur-md"
      }`}
    >
      <header id="header" className={`py-2 px-2 w-full  z-10`}>
        {/* DESKTOP NAVBAR */}
        <div className="hidden md:flex justify-between items-center max-w-7xl mx-auto">
          {/* BRAND LOGO */}
          <div
            onClick={() => router.push("/")}
            className="w-[140px] h-[60px] -ml-5"
          >
            {isScrolled || !isHomePage ? (
              <Image
                src={
                  isDevelopment
                    ? "/assets/logo/laxzin-logo-black.png"
                    : `${imageHostName}/storage/${contactInfo?.logo}`
                }
                height={800}
                width={800}
                className="h-full w-full object-cover cursor-pointer"
                priority
                alt="logo"
              />
            ) : (
              <Image
                src={
                  isDevelopment
                    ? "/assets/logo/laxzin-logo-white.png"
                    : `${imageHostName}/storage/${contactInfo?.logo}`
                }
                height={800}
                width={800}
                className="h-full w-full object-cover cursor-pointer"
                priority
                alt="logo"
              />
            )}
          </div>
          {/* NAVBAR ITEMS */}
          <div className="sm:block">
            <ul className="flex items-center justify-center !list-none gap-8 lg:gap-10">
              {catData?.map((item, index) => (
                <li key={index}>
                  <Link
                    href={`/product-list/${item?.slug}`}
                    className="group relative flex space-x-2 items-center cursor-pointer list-none"
                  >
                    <p
                      className={`uppercase text-sm font-light tracking-[0.1em] ${
                        isScrolled || !isHomePage
                          ? "text-primary hover:text-gray-600"
                          : "text-white hover:text-gray-200"
                      }  relative group`}
                    >
                      {item?.name}
                      <div
                        className={`absolute -bottom-1 left-0 w-full h-px transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                          isScrolled ? "bg-black" : "bg-white"
                        }`}
                      ></div>
                    </p>

                    {item?.nav_sub_categories?.length > 0 ? (
                      <div className="absolute z-10 w-[250px] top-full left-[30px] hidden group-hover:block bg-gray-50 py-2">
                        <div className="p-2 flex">
                          <ul className="w-full">
                            {item?.nav_sub_categories?.map(
                              (subCat, SubIndex) => (
                                <li
                                  key={SubIndex}
                                  className={`px-4 py-2 ${
                                    SubIndex ===
                                    item.nav_sub_categories.length - 1
                                      ? ""
                                      : "border-b border-gray-200"
                                  } text-black capitalize list-none text-sm cursor-pointer font-medium hover:text-black hover:duration-300 hover:translate-x-3`}
                                >
                                  <Link href={`/product-list/${subCat?.slug}`}>
                                    <p>{subCat?.name}</p>
                                  </Link>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-8">
            {/* SEARCH SECTION */}
            <div onClick={() => handleSearch()}>
              <FiSearch
                size={25}
                className={`${
                  isScrolled || !isHomePage
                    ? "text-gray-800 hover:text-gray-600"
                    : "text-white hover:text-gray-100"
                } cursor-pointer`}
              />
            </div>
            {/* USER PROFILE */}
            <div
              className={`flex items-center justify-center space-x-2 ${
                isScrolled || !isHomePage ? "text-gray-800" : "text-white"
              }`}
            >
              {!token ? (
                <Link
                  href={`/auth`}
                  className={`flex items-center gap-1 ${
                    isScrolled || !isHomePage
                      ? "text-gray-800 hover:text-gray-600"
                      : "text-white hover:text-gray-100"
                  } `}
                >
                  <div>
                    <AiOutlineUser size={25} />
                  </div>{" "}
                  {/* <div className="text-white">Login/register</div>{" "} */}
                </Link>
              ) : (
                <p>
                  <Link
                    href="/profile"
                    className={`${
                      isScrolled || !isHomePage ? "text-black" : "text-white"
                    } cursor-pointer`}
                  >
                    My panel
                  </Link>{" "}
                  <span
                    className={`${
                      isScrolled || !isHomePage ? "text-black" : "text-white"
                    } pl-3 cursor-pointer`}
                    onClick={handleLogOut}
                  >
                    Logout
                  </span>{" "}
                </p>
              )}
            </div>

            {/* CART */}
            <div
              onClick={() => handleCart()}
              className="relative cursor-pointer group"
            >
              <div>
                <SlHandbag
                  size={25}
                  className={`${
                    isScrolled || !isHomePage
                      ? "text-gray-800 group-hover:text-gray-600"
                      : "text-white hover:text-gray-100"
                  } cursor-pointer `}
                />
              </div>

              <div className="bg-black rounded-full text-white text-[10px] w-[18px] h-[18px] flex items-center justify-center absolute top-[-13px] right-[-9px]">
                {cartItems?.length}
              </div>
            </div>
            {/* SHOP NOW BUTTON */}
            {!token ? (
              <Button onClick={() => router.push("/shop")} className="md:ml-5">
                SHOP NOW
              </Button>
            ) : null}
          </div>
        </div>

        {/* MOBILE NAVBAR */}
        <div className="md:hidden flex justify-between items-center pt-3 xsm:px-2 px-0">
          <Link href={`/`} className="flex justify-start w-[120px] h-[40px]">
            {isScrolled || !isHomePage ? (
              <Image
                src={
                  isDevelopment
                    ? "/assets/logo/laxzin-logo-black.png"
                    : `${imageHostName}/storage/${contactInfo?.logo}`
                }
                height={800}
                width={800}
                className="h-full w-full object-cover cursor-pointer"
                priority
                alt="logo"
              />
            ) : (
              <Image
                src={
                  isDevelopment
                    ? "/assets/logo/laxzin-logo-white.png"
                    : `${imageHostName}/storage/${contactInfo?.logo}`
                }
                height={800}
                width={800}
                className="h-full w-full object-cover cursor-pointer"
                priority
                alt="logo"
              />
            )}
          </Link>

          <div className="flex space-x-4 items-center">
            <div onClick={() => handleSearch()}>
              <IoSearchOutline
                size={25}
                className={`${
                  isScrolled || !isHomePage ? "text-black" : "text-white"
                }`}
              />
            </div>
            <div onClick={() => setDrawerOpen(true)}>
              <RxHamburgerMenu
                size={25}
                className={`${
                  isScrolled || !isHomePage ? "text-black" : "text-white"
                }`}
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
