import CommonbgBanner from "@/Components/Common/CommonbgBanner";
import request from "@/lib/request";
import React, { useEffect, useState } from "react";

const TermsAndConditions = () => {

 
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      let res = await request(`terms-condition`);

      setData(res?.data);
    };
    getData();
  }, [1]);

  return (
    <div className="bg-gray-100 min-h-[670px]">
      <CommonbgBanner name={`Terms and condition`} />
      <section>
        <div className="max-w-[95rem] lg:max-w-[70rem] md:max-w-[60rem] sm:max-w-[45rem] xls:max-w-[25rem] xms:max-w-[22rem] xs:max-w-[19rem] px-2 py-10 mx-auto">
          <h1 className="text-4xl xls:text-2xl xms:text-2xl xs:text-2xl font-semibold text-center text-black dark:text-black">
            Terms and conditions
          </h1>
          <div className="py-4 pt-5">
            <div
              className="text-base dark:text-black"
              dangerouslySetInnerHTML={{ __html: data?.details }}
            ></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditions;

// export async function getStaticProps(context) {
//   let settings = await request(`terms-condition`);

//   return {
//     props: {
//       data: settings?.data || null,
//     },
   
//   };
// }
