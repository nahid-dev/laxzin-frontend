import Link from "next/link";
import React from "react";
import {
  MdChevronRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const SlideSectionHeader = ({
  title,
  arrowLeft,
  arrowRight,
  btnLink,
  btnText,
  wrapperClass,
  isDisableSlide = false,
}) => {
  return (
    <div className={`flex justify-between items-center ${wrapperClass}`}>
      <h2 className="md:text-xl text-primary dark:text-white font-medium">
        {title}
      </h2>
      <div className="flex items-center gap-3">
        {!isDisableSlide ? (
          <div className="flex items-center gap-3">
            <button
              className={`${arrowLeft} p-1 md:p-1.5 rounded-md bg-gray-50 hover:bg-gray-100 transition-all duration-200 cursor-pointer`}
            >
              <MdOutlineKeyboardArrowLeft size={20} className="text-primary" />
            </button>

            <button
              className={`${arrowRight} p-1 md:p-1.5 rounded-md bg-gray-50 hover:bg-gray-100 transition-all duration-20 cursor-pointer`}
            >
              <MdOutlineKeyboardArrowRight size={20} className="text-primary" />
            </button>
          </div>
        ):null}

        <Link
          href={btnLink}
          className="rounded-md bg-primary text-white capitalize px-3 py-1 text-xs md:text-base text-nowrap font-medium hover:bg-[#383838] transition-colors duration-200 flex items-center gap-1"
        >
          <span>{btnText}</span>
          <span>
            <MdChevronRight size={20} className="text-white hidden md:block" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SlideSectionHeader;
