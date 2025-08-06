/* eslint-disable @next/next/no-html-link-for-pages */


import Link from "next/link";
import styles from "./BottomNavbar.module.css";
import { useStatus } from "@/context/contextStatus";
import { AiFillHome } from "react-icons/ai";

import { FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { SlHandbag } from "react-icons/sl";

export default function BottomNavbar() {
  const { setProfileMenu, cartItems, setIsCartOpen, isCartOpen } = useStatus();


  const handleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div
      className={`bg-black md:hidden fixed bottom-0 w-full z-10  p-[8px] shadow-lg filter drop-shadow-lg`}
    >
      <div className={styles.icons}>
        <div onClick={() => setProfileMenu(true)}>
          <span>
            <FaUser size={22} className="fill-current text-white" />
          </span>
          <span className="text-[10px] text-white capitalize">Account</span>
        </div>
        <Link href="/">
          <span>
            <AiFillHome size={22} className="fill-current text-white" />
          </span>
          <span className="text-[10px] text-white capitalize ">Home</span>
        </Link>
        <div onClick={() => handleCart()} className="relative">
          <div>
            <SlHandbag size={22} className="text-white" />
          </div>

          <div className="bg-black rounded-full text-white text-base w-[18px] h-[18px] flex items-center justify-center absolute top-[-13px] right-[30px]">
            {cartItems?.length}
          </div>
        </div>
      </div>
    </div>
  );
}
