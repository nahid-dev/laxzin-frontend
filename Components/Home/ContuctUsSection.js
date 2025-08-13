import React, { useEffect, useState } from "react";
import SectionHeader from "../SectionHeader";
import Image from "next/image";
import Button from "../Common/Button";
import ContactInfo from "../ContactInfo";
import request from "@/lib/request";

const ContactUsSection = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      let res = await request(`contact-info`);
      setData(res?.data);
    };
    getData();
  }, [1]);
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 md:px-0">
        <SectionHeader title="CONTACT US" />

        {/* Contact Banner */}
        <div className="relative h-64 sm:h-96 rounded-lg overflow-hidden mb-8 sm:mb-12">
          <Image
            src="/image/placeholder.png"
            alt="Contact Us Banner"
            height={180}
            width={1080}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h3 className="text-2xl sm:text-4xl font-light tracking-[0.2em] mb-3 sm:mb-4">
                GET IN TOUCH
              </h3>
              <p className="text-lg sm:text-xl font-light tracking-[0.1em] mb-6 sm:mb-8">
                We'd love to hear from you
              </p>
              <Button>START CONVERSATION</Button>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          <ContactInfo
            icon={
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            }
            title="PHONE"
            info={data?.phone}
          />
          <ContactInfo
            icon={
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            }
            title="EMAIL"
            info={data?.email}
          />
          <ContactInfo
            icon={
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            }
            title="ADDRESS"
            info={data?.address}
          />
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;
