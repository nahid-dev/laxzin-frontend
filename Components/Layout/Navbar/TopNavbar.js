import React from 'react'
import { CiMobile2 } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdGift } from "react-icons/io";
import { BsQuestionCircle } from "react-icons/bs";


const TopNavbar = () => {
  return (
    <div className="bg-white xs:px-10 px-3">
      <div className="flex justify-between py-2">
        <p className="font-semibold xs:text-base text-sm text-black">
          App Exclusive use code: APP500 OFF! Only on App!
        </p>

        <ul className="md:flex hidden space-x-4 ">
          <li className="list-none flex items-center space-x-1">
            <div>
              <CiMobile2 size={22} className="text-black" />
            </div>
            <p className="font-semibold uppercase text-black">get app</p>
          </li>

          <li className="list-none flex items-center space-x-1">
            <div>
              <IoLocationOutline size={22} className="text-black" />
            </div>
            <p className="font-semibold uppercase text-black">store</p>
          </li>

          <li className="list-none flex items-center space-x-1">
            <div>
              <IoMdGift size={22} className="text-black" />
            </div>
            <p className="font-semibold uppercase text-black">gift card</p>
          </li>
          <li className="list-none flex items-center space-x-1">
            <div>
              <BsQuestionCircle size={22} className="text-black" />
            </div>
            <p className="font-semibold uppercase text-black">help</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TopNavbar