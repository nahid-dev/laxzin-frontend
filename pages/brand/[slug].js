
import CommonbgBanner from "@/Components/Common/CommonbgBanner";
import ProductCard from "@/Components/ProductDetails/ProductCard";

import request from "@/lib/request";
import { Pagination } from "antd";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProductList = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const [data, setData] = useState([]);





  useEffect(() => {
    if (router?.query?.slug) {
      const getData = async () => {
        const res = await request(
          `brand/${router.query.slug}?page=${page}`
        );
       
  

        setData(res.data?.data);
     
      };
      getData();
    }
  }, [router?.query?.slug]);



  useEffect(() => {
    const handleRouteChange = () => {};

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    if (typeof window.fbq === "function") {
      window.fbq("track", "Pageview");
    }
  }, []);

  

  return (
    <div className="bg-[#F3F3F3] min-h-[550px]">
      <CommonbgBanner name={`Brand`} />
      <div className="xl:max-w-[70rem] lg:max-w-[65rem] md:max-w-[50rem] sm:max-w-[36rem] max-w-[15rem] mx-auto">
        <div className=" pb-4">
          {data?.length > 0 ? (
            <div>
              <div className="grid  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 xls:gap-3 xms:gap-3 xs:gap-3">
                {data?.map((item, index) => (
                  <div key={index}>
                    <ProductCard item={item} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {data?.length == 0 ? (
                <div className="flex justify-center pt-10">
                  {/* <Lottie loop={true} animationData={PageNotFound} /> */}
                  <span className="font-bold text-4xl text-black">
                    No Data Found
                  </span>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;

// export async function getServerSideProps(context) {

 

//   try {
//     let page = 1;

//     let res = await request(`brand/${context.query.slug}?page=${page}`);


//     if (res?.data?.length == 0) {
//       return {
//         notFound: true,
//       };
//     } else {
//       return {
//         props: {
//           Data: res?.data?.data || null,
//           PageSize: res?.data?.per_page || null,
//           TotalData: res?.data?.total || null,
//           category_name: res?.sections?.name || null,
//         },
//       };
       
//     }

    
//   } catch (error) {
//     console.error("Error fetching product data:", error);
//     return {
//       notFound: true,
//     };
//   }

  
// }
