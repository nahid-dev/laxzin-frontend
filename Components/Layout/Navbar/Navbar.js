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

  const handleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const router = useRouter();

  const search = (val) => {
    if (val !== "") {
      const encodedVal = encodeURIComponent(val);
      router.push(`/search/${encodedVal}`);
    } else {
      router.push(`/`);
    }
  };

  const handleSearch = () => {
    setSearchModal(!searchModal);
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
    <div className="sticky top-0 right-0 w-full z-40">
      <header
        id="header"
        className={`py-2 px-2 w-full  z-10 bg-black shadow-md  drop-shadow`}
      >
        <div className="hidden md:block">
          <div className="justify-between items-center px-6  flex ">
            <div
              onClick={() => router.push("/")}
              className="w-[220px] h-[100px]  relative"
            >
              <Image
                src={`${imageHostName}/storage/${contactInfo?.logo}`}
                height={500}
                width={500}
                className="h-full w-full object-fill cursor-pointer"
                priority
                alt="logo"
              />
            </div>
            <div className="relative">
              <div className="flex items-center">
                <input
                  className="lg:w-[650px] w-[500px] py-2  outline-none bg-[#212121] text-white pl-4 border border-white placeholder:text-sm placeholder:text-gray-200 rounded-l-lg"
                  placeholder="Search by keywords"
                  onChange={(e) => search(e.target.value)}
                  type="text"
                />
                <div className="px-4 h-[42px] flex justify-center items-center bg-white rounded-r-lg">
                  <svg
                    className="h-4 w-4 fill-current text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
                  </svg>
                  <p className="text-black">search</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-2">
              {!token ? (
                <>
                  <div>
                    <FaUserCircle size={22} className="text-white" />
                  </div>{" "}
                  <Link href={`/auth`} className="text-white">
                    Login/register
                  </Link>{" "}
                </>
              ) : (
                <p>
                  <Link href="/profile" className="pr-3 text-white">
                    My panel
                  </Link>{" "}
                  <span
                    className="cursor-pointer text-white"
                    onClick={handleLogOut}
                  >
                    Logout
                  </span>{" "}
                </p>
              )}
            </div>

            <div
              onClick={() => handleCart()}
              className="relative cursor-pointer"
            >
              <div>
                <SlHandbag size={25} className={`text-white cursor-pointer`} />
              </div>

              <div className="bg-black rounded-full text-white text-[10px] w-[18px] h-[18px] flex items-center justify-center absolute top-[-13px] right-[-9px]">
                {cartItems?.length}
              </div>
            </div>
          </div>

          <div className="bg-[#141414] mt-3 sm:block hidden">
            {" "}
            <ul className="flex items-center justify-center  header ">
              {catData?.map((item, index) => (
                <li key={index}>
                  <Link
                    href={`/product-list/${item?.slug}`}
                    className="group relative flex space-x-2 items-center px-4 py-2 cursor-pointer hover:text-secondary  list-none"
                  >
                    <p className="uppercase text-sm text-white">{item?.name}</p>

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
        </div>

        <div className="md:hidden flex justify-between items-center pt-3 xsm:px-2 px-0">
          <Link href={`/`} className="flex justify-start w-[150px] h-[60px]">
            <Image
              src={`${imageHostName}/storage/${contactInfo?.logo}`}
              height={500}
              width={500}
              className="h-full w-full object-fill cursor-pointer"
              priority
              alt="logo"
            />
          </Link>

          <div className="flex space-x-4 items-center">
            <div onClick={() => handleSearch()}>
              <IoSearchOutline size={25} className={`text-white`} />
            </div>
            <div onClick={() => setDrawerOpen(true)}>
              <RxHamburgerMenu size={25} className="text-white" />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
