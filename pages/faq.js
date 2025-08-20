import CommonbgBanner from "@/Components/Common/CommonbgBanner";
import request from "@/lib/request";
import { useEffect, useState } from "react";

const Faq = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      let res = await request(`faq`);
      setData(res?.data);
    };
    getData();
  }, [1]);

  return (
    <div className="bg-gray-100 min-h-[670px]">
      <CommonbgBanner name={`Faq`} />
      <section>
        <div className=" max-w-[95rem] lg:max-w-[70rem] md:max-w-[60rem] sm:max-w-[45rem] xls:max-w-[25rem] xms:max-w-[22rem] xs:max-w-[19rem] px-2 py-10 mx-auto">
          <h1 className=" xs:text-3xl text-xl font-semibold text-center text-black dark:text-black">
            Faq
          </h1>
          <div className="py-4 pt-5">
            <div
              className="text-base text-black"
              dangerouslySetInnerHTML={{ __html: data?.details }}
            ></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faq;
