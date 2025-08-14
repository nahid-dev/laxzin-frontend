
import { useStatus } from "@/context/contextStatus";
import Link from "next/link";
import { useRouter } from "next/router";


import React, { useState } from "react";

const LeftMenu = ({ item }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { setSideCategory } = useStatus();

  const router = useRouter();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  //  console.log("last...index", item?.children?.length - 1);

  const handleClick = (slug) => {
    setSideCategory(false);
    // router.push(`/category/${slug}`);
  };

  return (
    <>
      <button
        className="flex items-center justify-between list-none w-full text-sm font-medium"
        onClick={() => handleClick(item?.slug)}
      >
        <span className="text-white uppercase font-semibold">{item?.name}</span>

        {item?.nav_sub_categories?.length > 0 ? (
          <>
            {isDropdownOpen ? (
              <svg
                onClick={() => toggleDropdown()}
                className="h-5 w-5 fill-current text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5 11V13H19V11H5Z"></path>
              </svg>
            ) : (
              <svg
                onClick={() => toggleDropdown()}
                className="h-5 w-5 fill-current text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
              </svg>
            )}
          </>
        ) : null}
      </button>
      {isDropdownOpen && (
        <ul className="pl-4 mt-2 space-y-2 transition-all duration-300">
          {item?.nav_sub_categories?.length > 0 ? (
            <>
              {item?.nav_sub_categories?.map((subItem, subIndex) => (
                <div key={subIndex}>
                  <li
                    className={`list-none text-sm ${
                      subIndex === item.nav_sub_categories.length - 1
                        ? "border-none"
                        : "border-b border-gray-300"
                    } py-2 text-white`}
                  >
                    <Link
                      href={`/category/${subItem?.slug}`}
                      className="text-white"
                      onClick={() => setSideCategory(false)}
                    >
                      {subItem?.name}
                    </Link>
                  </li>
                </div>
              ))}
            </>
          ) : null}
        </ul>
      )}
    </>
  );
};

export default LeftMenu;
