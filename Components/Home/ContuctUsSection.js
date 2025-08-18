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
    <section className="py-8 sm:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 md:px-0">
        <SectionHeader title="CONTACT US" />

        {/* Contact Banner */}
        <div className="relative h-64 sm:h-96 rounded-lg overflow-hidden mb-8 sm:mb-12">
          <Image
            src="/image/slide2_50.png"
            alt="Contact Us Banner"
            height={180}
            width={1080}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h2 className="text-2xl sm:text-4xl font-light tracking-[0.2em] mb-3 sm:mb-4">
                GET IN TOUCH
              </h2>
              <p className="text-lg sm:text-xl font-light tracking-[0.1em] mb-6 sm:mb-8 !text-white">
                We'd love to hear from you
              </p>
              <a href={`tel:${data?.phone}`} className="inline-block">
                <Button
                  variant="secondary"
                  className="hover:bg-gray-200 hover:!text-gray-800"
                >
                  START CONVERSATION
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;
