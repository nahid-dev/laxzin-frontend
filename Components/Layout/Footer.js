import request from "@/lib/request";
import Link from "next/link";
import { useEffect, useState } from "react";

// import TrackingModal from "@/components/TrackingModal";
import { useStatus } from "@/context/contextStatus";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiTwotoneMail } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { imageHostName } from "@/lib/config";
import { Button } from "antd";
import {
  FaFacebook,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaYoutube,
} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const COL_HEADER_STYLE = "text-lg font-light text-white";
const ITEM_STYLE =
  "inline text-sm font-light text-gray-400 hover:text-white w-fit cursor-pointer";

const quickLInks = [
  { name: "About Us", link: "/about-us" },
  { name: "Terms & Conditions", link: "/terms-and-condition" },
  { name: "Privacy Policy", link: "/privacy-policy" },
  { name: "Return Policy", link: "/return" },
  { name: "Support Policy", link: "/support-policy" },
];

const otherLinks = [
  { name: "Beauty Blogs", link: "/beauty-blogs" },
  { name: "Skin Expert", link: "/skin-expert" },
  { name: "For Wholesale", link: "/for-wholesale" },
];

const Footer = ({ contactInfo }) => {
  const { token, setaccountMenu } = useStatus();
  const [data, setData] = useState({});

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      let res = await request(`contact-info`);
      setData(res?.data);
    };
    getData();
  }, [1]);

  const handleRoute = () => {
    if (!token) {
      toast.warning("Login First");
      return;
    }
    router.push("/dashboard");
    setaccountMenu("wishlist");
  };
  const handleRouteOrder = () => {
    if (!token) {
      toast.warning("Login First");
      return;
    }
    router.push("/dashboard");
    setaccountMenu("purchase");
  };

  const isDevelopment = process.env.NEXT_PUBLIC_MODE === "development";

  return (
    <div>
      <footer className="bg-primary text-white">
        <div className="mx-auto px-4 xl:px-0 py-12 max-w-7xl">
          <div className="grid grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="space-y-4 col-span-5 md:col-span-1">
              <div className="w-full flex justify-center sm:justify-start">
                <div className="w-[140px] h-[60px]">
                  <Image
                    src={
                      isDevelopment
                        ? "/assets/logo/laxzin-logo-white.png"
                        : `${imageHostName}/storage/${contactInfo?.logo}`
                    }
                    height={800}
                    width={800}
                    className="h-full w-full object-cover cursor-pointer -ml-5"
                    loading="lazy"
                    alt="logo"
                  />
                </div>
              </div>

              <p className="text-gray-400 text-sm font-light leading-relaxed">
                Your trusted partner for premium beauty and skincare products in
                Bangladesh. We bring you the finest quality cosmetics for your
                daily beauty routine.
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-5 py-5">
                <Link href={`${data?.facebook}`} target="_blank">
                  <Image
                    src={"/assets/slider/facebook.webp"}
                    width={30}
                    height={30}
                    alt="facebook"
                  />
                </Link>
                <Link href={`${data?.instagram_link}`} target="_blank">
                  <Image
                    src={"/assets/slider/instagram.webp"}
                    width={30}
                    height={30}
                    alt="facebook"
                  />
                </Link>
                <Link href={`${data?.whatsapp_link}`} target="_blank">
                  <Image
                    src={"/assets/slider/whatsapp.webp"}
                    width={30}
                    height={30}
                    alt="facebook"
                  />
                </Link>
                <Link href={`${data?.youtube_link}`} target="_blank">
                  <Image
                    src={"/assets/slider/youtube.webp"}
                    width={30}
                    height={30}
                    alt="facebook"
                  />
                </Link>
                <Link href={`${data?.tiktok_link}`} target="_blank">
                  <Image
                    src={"/assets/slider/tik-tok.webp"}
                    width={30}
                    height={30}
                    alt="facebook"
                  />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4 md:pl-10 col-span-2 xs:col-span-1">
              <h3 className={COL_HEADER_STYLE}>Quick Links</h3>
              <div className="flex flex-col gap-3">
                {quickLInks.map((link, index) => (
                  <Link key={index} href={link?.link} className={ITEM_STYLE}>
                    {link?.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* My Account */}
            <div className="space-y-4 col-span-3 xs:col-span-1">
              <h3 className={COL_HEADER_STYLE}>My Account</h3>
              <div className="flex flex-col gap-3">
                <div
                  onClick={() => router.push("/auth")}
                  className={ITEM_STYLE}
                >
                  <div className="">Login</div>
                </div>
                <div onClick={() => handleRouteOrder()} className={ITEM_STYLE}>
                  <div className="">Order History</div>
                </div>
                <div onClick={() => handleRoute()} className={ITEM_STYLE}>
                  <div className="">My Wishlist</div>
                </div>
                {/* <div
                  onClick={() => handleOpen()}
                  className="inline text-gray-300 hover:text-white cursor-pointer"
                >
                  <div className="">Track Order</div>
                </div> */}
                <div className="py-1 flex gap-3">
                  <Link href={"/faq"} className={ITEM_STYLE}>
                    Faq
                  </Link>
                </div>
              </div>
            </div>

            {/* OTHER Links */}
            <div className="space-y-4 col-span-2 md:col-span-1">
              <h3 className={COL_HEADER_STYLE}>Other Links</h3>
              <div className="flex flex-col gap-3">
                {otherLinks.map((link, index) => (
                  <Link key={index} href="#" className={ITEM_STYLE}>
                    {link?.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 col-span-3 lg:col-span-1">
              <h3 className={COL_HEADER_STYLE}>Contact Info</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <FaPhoneAlt className="size-5 text-white" />
                  <span className="text-sm font-light text-gray-400">
                    {data?.phone}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <IoMdMail className="size-5 text-white" />
                  <span className="text-sm font-light text-gray-400">
                    {data?.email}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span>
                    <FaMapMarkerAlt className="size-5 text-white mt-1" />
                  </span>
                  <span className="text-sm font-light text-gray-400">
                    {data?.address}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 md:gap-5 py-2">
                <Link
                  href={`https://play.google.com/store/apps/details?id=com.laxzinapp`}
                  target="_blank"
                >
                  <Image
                    src={"/assets/slider/play.webp"}
                    width={120}
                    height={60}
                    alt="Play Store"
                  />
                </Link>
                <div>
                  <Image
                    src={"/assets/slider/app.webp"}
                    width={120}
                    height={60}
                    alt="app Store"
                  />
                </div>
              </div>
            </div>
          </div>
          <p className="text-gray-400 text-sm pb-5 md:pb-0 pt-2 mb:pt-0">
            Copyright © 2025 Laxzin. All rights reserved.
          </p>

          {/* Bottom Bar */}
          {/* <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              Copyright © 2025 Laxzin. All rights reserved.
            </p>
          </div> */}
        </div>
      </footer>
    </div>
  );
};

export default Footer;
