import CommonbgBanner from "@/Components/Common/CommonbgBanner";
import request from "@/lib/request";
import React from "react";
import ContactImage from "@/public/contact-background.jpg";
import Image from "next/image";

const Contact = () => {
  return (
    <div className="bg-gray-100 min-h-[670px] ">
      <CommonbgBanner name={`Contact`} />
      <section>
        <div className="max-w-[95rem] lg:max-w-[70rem] md:max-w-[60rem] sm:max-w-[45rem] xls:max-w-[25rem] xms:max-w-[22rem] xs:max-w-[19rem] px-2 py-10 mx-auto">
          <div className="grid md:grid-cols-2 grid-cols-1 bg-white">
            <div>
              <Image src={ContactImage} width={600} height={600} />
            </div>
            <div className="p-5">
              <p className="uppercase py-4 text-black font-semibold text-xl">send your question</p>

              <div>
                <div className="pb-4">
                  <input
                    type="text"
                    className="w-full py-2  border border-gray-100 rounded-md placeholder:text-sm bg-white text-black pl-2 outline-none"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="pb-4">
                  <input
                    type="email"
                    className="w-full text-black py-2 border border-gray-100 rounded-md placeholder:text-sm bg-white pl-2 outline-none"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <textarea
                    className="w-full text-black pl-2 pt-2 bg-white rounded-md border border-gray-100 outline-none placeholder:text-sm"
                    placeholder="your message"
                    rows={`3`}
                  ></textarea>
                </div>
                <div className="w-full mt-2">
                    <button className="uppercase text-white text-center bg-black w-full py-2">send</button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;


