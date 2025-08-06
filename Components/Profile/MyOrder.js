import { useStatus } from "@/context/contextStatus";
import request from "@/lib/request";
import { Pagination } from "antd";
import LottiePlayer from "lottie-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import NotFound from "../../Components/office.json";
import SingleOrderModal from "../SingleOrderModal";

import dayjs from "dayjs";
import OrderTrackModal from "../OrderTrackModal";

const MyOrder = () => {
  const [page, setPage] = useState(1);

  const { token } = useStatus();

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [total, setTotal] = useState(null);

  const router = useRouter();

  const [singleData, setSingleData] = useState({});

  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [trackModal, setTrackModal] = useState(false);

  useEffect(() => {
    if (token) {
      const getData = async () => {
        const res = await request(`ecom-order-list?page=1`);
        if (res?.success) {
          setTotal(res?.data?.total);
          setData(res?.data?.data);
          setLoading(false);
        }
      };
      getData();
    }
  }, [token, page]);

  const handleOrderDetails = (val) => {
    setOrderModalOpen(true);
    setSingleData(data[val]);
  };

  const handleOrderTrack = (val) => {
    setTrackModal(true);
    setSingleData(data[val]);
  };

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "170px",
          }}
        >
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#1F2937"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            visible={true}
          />
        </div>
      ) : (
        <>
          {data?.length > 0 ? (
            <div className="bg-white p-3 rounded-md">
              <div className="flex space-x-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M7.83 20A3.001 3.001 0 1 1 4 16.17V7.83A3.001 3.001 0 1 1 7.83 4h8.34A3.001 3.001 0 1 1 20 7.83v8.34A3.001 3.001 0 1 1 16.17 20H7.83zm0-2h8.34A3.008 3.008 0 0 1 18 16.17V7.83A3.008 3.008 0 0 1 16.17 6H7.83A3.008 3.008 0 0 1 6 7.83v8.34A3.008 3.008 0 0 1 7.83 18zM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm14 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM5 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                </svg>
                <h1 className="font-semibold text-2xl">
                  <span className="text-black">My Order</span>{" "}
                </h1>
              </div>

              <div className="flex flex-col  rounded-lg mt-4 overflow-hidden overflow-x-auto">
                <div className=" sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div>
                      <table className="min-w-full text-left text-sm font-light">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-white dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-base">
                              Invoice no
                            </th>
                            <th scope="col" className="px-6 py-3 text-base">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-base">
                              Grand total
                            </th>
                            <th scope="col" className="px-6 py-3 text-base">
                              Payment
                            </th>
                            <th scope="col" className="px-6 py-3 text-base">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-black">
                          {data?.map((item, index) => (
                            <tr
                              className="bg-white border-b dark:bg-white dark:border-gray-700"
                              key={index}
                            >
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-700"
                              >
                                {item?.invoice_no}
                              </th>
                              <td className="px-6 py-4">
                                {dayjs(item?.sale_date).format("DD-MM-YYYY")}
                              </td>
                              <td className="px-6 py-4">
                                {item?.grand_total} tk
                              </td>
                              <td className="px-6 py-4">Cash</td>
                              <td className="px-6 py-4">
                                <div>
                                  {item?.delivery_status == 1
                                    ? "New order"
                                    : item?.delivery_status == 2
                                    ? "pending"
                                    : item?.delivery_status == 3
                                    ? "pending payment"
                                    : item?.delivery_status == 4
                                    ? "confirm"
                                    : item?.delivery_status == 5
                                    ? "hold"
                                    : item?.delivery_status == 6
                                    ? "processing"
                                    : item?.delivery_status == 7
                                    ? "send to courier"
                                    : item?.delivery_status == 8
                                    ? "Assign to rider"
                                    : item?.delivery_status == 9
                                    ? "Delivered"
                                    : item?.delivery_status == 10
                                    ? "Return"
                                    : item?.delivery_status == 11
                                    ? "Exchange"
                                    : item?.delivery_status == 12
                                    ? "Cancel"
                                    : null}
                                </div>
                              </td>
                              <td className="flex space-x-3 px-6 py-4">
                                <button
                                  className="px-3 bg-red-600 text-white font-medium text-sm py-2 tracking-wider"
                                  onClick={() => handleOrderTrack(index)}
                                >
                                  Track order
                                </button>
                                <button
                                  className="px-3 bg-green-500 text-white font-medium text-sm py-2 tracking-wider"
                                  onClick={() => handleOrderDetails(index)}
                                >
                                  view
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center py-6">
                <Pagination
                  current={page}
                  total={total}
                  onChange={(page) => setPage(page)}
                  showSizeChanger={false}
                />
              </div>
            </div>
          ) : (
            <div className="bg-white p-3 rounded-md">
              {" "}
              <div className="w-96 xls:w-72 xms:w-64 xs:w-56 mx-auto">
                <LottiePlayer loop={true} animationData={NotFound} />
              </div>
            </div>
          )}
        </>
      )}

      <SingleOrderModal
        orderModalOpen={orderModalOpen}
        setOrderModalOpen={setOrderModalOpen}
        singleData={singleData}
        setSingleData={setSingleData}
      />

      <OrderTrackModal
        trackModal={trackModal}
        setTrackModal={setTrackModal}
        singleData={singleData}
        setSingleData={setSingleData}
      />
    </>
  );
};

export default MyOrder;
