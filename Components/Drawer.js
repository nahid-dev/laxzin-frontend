import { useStatus } from "@/context/contextStatus";


import { useEffect, useRef, useState } from "react";

import request from "@/lib/request";
import LeftMenu from "./Layout/LeftMenu";
import Link from "next/link";
import Button from "./Common/Button";
import { useRouter } from "next/navigation";

const Drawer = () => {
  const { drawerOpen, setDrawerOpen } = useStatus();
  const wrapperRef = useRef(null);
  const [catData, setCatData] = useState([]);
  const router = useRouter();

  const handleClick = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setDrawerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, drawerOpen]);

  useEffect(() => {
    let getData = async () => {
      let res = await request(`navbar-categories`);

      setCatData(res?.categories);
    };
    getData();
  }, [1]);

  const handleShopClick = () => {
    setDrawerOpen(false);
    router.push("/shop");
  };

  return (
    <div
      className={`${
        drawerOpen
          ? "translate-x-[16px] duration-500 z-50 fixed top-[0px] bottom-0 bg-[#25201ef2] xsm:w-[360px] w-full  right-[15px]  shadow-lg text-black"
          : "translate-x-[420px] duration-500 z-50 fixed top-[0px] bottom-0 bg-[#25201ef2] xsm:w-[360px] w-full  right-[15px] shadow-lg text-black"
      } overflow-auto`}
      ref={wrapperRef}
    >
      <div className="relative h-full w-full top-[0px] left-0 right-0 bottom-0 p-4">
        <div
          onClick={() => handleClick()}
          className="cursor-pointer absolute   right-[10px] "
        >
          <svg
            className="fill-current text-white hover:rotate-180 duration-500 h-10 w-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 28 28"
            width="28"
            height="28"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
          </svg>
        </div>

        <ul className="text-white pt-12 pl-5 space-y-8">
          <li className="list-none" onClick={() => setDrawerOpen(false)}>
            <Link href="/">
              <p className="uppercase text-xl">home</p>
            </Link>
          </li>

          <ul>
            {catData?.map((item, index) => (
              <div key={index}>
                {item?.nav_sub_categories?.length > 0 ? (
                  <li className="list-none py-2 border-b border-gray-300">
                    <LeftMenu item={item} />
                  </li>
                ) : (
                  <li
                    className="list-none py-2 border-b border-gray-300"
                    onClick={() => setDrawerOpen(false)}
                  >
                    <Link href={`/category/${item?.slug}`}>{item?.name}</Link>
                  </li>
                )}
              </div>
            ))}
          </ul>
          <div>
            <Button onClick={handleShopClick} className="w-full">
              Shop Now
            </Button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
