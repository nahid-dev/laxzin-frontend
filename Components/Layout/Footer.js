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


const Footer = ({ contactInfo }) => {
  const { token, setaccountMenu } = useStatus();
  const [data, setData] = useState({});
  // const [trackingModal, setTrackingModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      let res = await request(`contact-info`);
      setData(res?.data);
    };
    getData();
  }, [1]);

  // const handleOpen = () => {
  //   setTrackingModal(true);
  // };

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

  return (
    <div className="" id="footer">
      <div className="bg-black text-white">
        <div className="xs:px-16 px-5">
          <div
            onClick={() => router.push("/")}
            className="w-[200px] h-[100px] relative cursor-pointer mx-auto"
          >
            <Image
              src={`${imageHostName}/storage/${contactInfo?.logo}`}
              height={500}
              width={500}
              className="h-full w-full object-fill"
              priority
              alt="logo"
            />
          </div>

          <div className="flex items-center justify-center gap-2 py-5 space-x-5">
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
            <Link href={`${data?.twitter_link}`} target="_blank">
              <Image
                src={"/assets/slider/twitter.webp"}
                width={30}
                height={30}
                alt="facebook"
              />
            </Link>
            <Link href={`${data?.pinterest_link}`} target="_blank">
              <Image
                src={"/assets/slider/pinterest.webp"}
                width={30}
                height={30}
                alt="facebook"
              />
            </Link>
          </div>
          <div>
            <div className="md:flex block items-center justify-center md:gap-2 gap-4 py-5  border-y-2 border-white md:space-x-16 space-x-0">
              <div className="py-1 flex gap-1 items-center justify-center">
                <Link href={"/about-us"} className="text-xl font-semibold">
                  About Us
                </Link>
              </div>
              <div className="py-1 flex items-center justify-center gap-1">
                <Link
                  href={"/terms-and-condition"}
                  className="text-xl font-semibold"
                >
                  Terms & Conditions
                </Link>
              </div>
              <div className="py-1 flex items-center justify-center gap-1">
                <Link href={"/return"} className="text-xl font-semibold">
                  Return Policy
                </Link>
              </div>
              <div className="py-1 flex items-center justify-center gap-1">
                <Link
                  href={"/support-policy"}
                  className="text-xl font-semibold"
                >
                  Support Policy
                </Link>
              </div>
              <div className="py-1 flex items-center justify-center gap-1">
                <Link
                  href={"/privacy-policy"}
                  className="text-xl font-semibold"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          <div className=" py-4">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
              <div>
                <div className="border-b border-black text-[13px] font-semibold pb-1">
                  CONTACT INFO
                </div>
                <div className="py-1 flex gap-3 pb-4">
                  <div>
                    <IoLocationOutline className="text-[20px]" />
                  </div>
                  <div className="text-xl font-semibold">{data?.address}</div>
                </div>
                <div className="py-1 flex gap-3">
                  <div>
                    <FiPhone className="text-[16px]" />
                  </div>
                  <div className="text-xl font-semibold">{data?.phone}</div>
                </div>
                <div className="py-1 flex gap-3">
                  <div>
                    <AiTwotoneMail className="text-[18px]" />
                  </div>
                  <div className="text-xl font-semibold">{data?.email}</div>
                </div>
              </div>
              <div>
                <div className="border-b border-black text-[13px] font-semibold pb-1">
                  MY ACCOUNT
                </div>
                <div
                  onClick={() => router.push("/auth")}
                  className="py-1 flex gap-3 cursor-pointer"
                >
                  <div className="text-xl font-semibold">Login</div>
                </div>
                <div
                  onClick={() => handleRouteOrder()}
                  className="py-1 flex gap-3 cursor-pointer"
                >
                  <div className="text-xl font-semibold">Order History</div>
                </div>
                <div
                  onClick={() => handleRoute()}
                  className="py-1 flex gap-3 cursor-pointer"
                >
                  <div className="text-xl font-semibold">My Wishlist</div>
                </div>
                {/* <div
                  onClick={() => handleOpen()}
                  className="py-1 flex gap-3 cursor-pointer"
                >
                  <div className="text-xl font-semibold">Track Order</div>
                </div> */}
                <div className="py-1 flex gap-3">
                  <Link href={"/faq"} className="text-xl font-semibold">
                    Faq
                  </Link>
                </div>
              </div>

              <div>
                <div className="border-b border-black text-[13px] font-semibold pb-1">
                  QUICK LINKS
                </div>
                <div className="flex items-center py-1">
                  <div className="text-xl bg-black px-2 py-2 text-white rounded-md  flex items-center justify-center">
                    Beauty Blogs
                  </div>
                </div>
                <div className="flex items-center py-1">
                  <div className="text-xl bg-black px-2 py-2 text-white rounded-md  flex items-center justify-center">
                    Skin Expert
                  </div>
                </div>
                <div className="flex items-center py-1">
                  <div className="text-xl bg-black px-2 py-2  text-white rounded-md  flex items-center justify-center">
                    For Wholesale
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-4 border-y-2 border-white">
            <div className="xs:flex block justify-center items-center space-x-2">
              <div className="text-center text-xl font-semibold ">
                Let&apos;s Do Beauty & Grooming Together
              </div>

              <div className="flex items-center justify-center gap-2 py-2">
                <Link
                  href={`https://play.google.com/store/apps/details?id=com.laxzinapp`}
                  target="_blank"
                >
                  <Image
                    src={"/assets/slider/play.webp"}
                    width={120}
                    height={60}
                    alt="facebook"
                  />
                </Link>
                <div>
                  <Image
                    src={"/assets/slider/app.webp"}
                    width={120}
                    height={60}
                    alt="facebook"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black pb-12">
        <div className="max-w-[85rem] mx-auto  grid">
          <div className="px-2 py-4">
            <div className="flex items-center justify-between h-full xs:flex xxxsm:flex-col gap-1">
              <div className="text-base text-gray-400 font-semibold">
                Copyright © 2022 Laxzin. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

