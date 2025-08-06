import ChangePassword from "@/Components/Profile/ChangePassword";
import MyOrder from "@/Components/Profile/MyOrder";
import MyProfile from "@/Components/Profile/MyProfile";
import Head from "next/head";
import { useState } from "react";

const Profile = () => {
  const [step, setStep] = useState("profile");

  const handleClick = (value) => {
    setStep(value);
  };

  return (
    <div suppressHydrationWarning>
      <Head>
        <title>profile</title>
        <meta name="description" content="Lexzin" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`bg-gray-100 md:pt-[50px]  pt-[10px] `}>
        <div className="lg:max-w-7xl xs:max-w-[60rem] max-w-[24rem]   mx-auto min-h-[600px] pt-5 pb-5">
          <div className="grid grid-cols-1 md:grid-cols-12  gap-8 md:gap-3 sm:gap-3">
            <div className="md:col-span-3  col-span-full">
              <div className="bg-white rounded-md shadow-md">
                <div className="px-5 py-4 space-y-5">
                  <div
                    onClick={() => handleClick("profile")}
                    className={`${
                      step == "profile" ? "bg-black text-white" : null
                    } group flex space-x-4  items-center  shadow-md py-2 px-2 drop-shadow-md hover:bg-black cursor-pointer hover:duration-500`}
                  >
                    <div>
                      <svg
                        className={`fill-current group-hover:text-white ${
                          step == "profile" ? "text-white" : "text-black"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M20 22h-2v-2a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v2H4v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2zm-8-9a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                      </svg>
                    </div>
                    <div
                      className={`${
                        step == "profile" ? "text-white" : "text-black"
                      } font-medium group-hover:text-white`}
                    >
                      My profile
                    </div>
                  </div>

                  <div
                    className={`${
                      step == "order" ? "bg-black text-white" : null
                    } group flex space-x-4  items-center  shadow-md py-2 px-2 drop-shadow-md hover:bg-black cursor-pointer hover:duration-500`}
                    onClick={() => handleClick("order")}
                  >
                    <div>
                      <svg
                        className={`fill-current group-hover:text-white ${
                          step == "order" ? "text-white" : "text-black"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M7.83 20A3.001 3.001 0 1 1 4 16.17V7.83A3.001 3.001 0 1 1 7.83 4h8.34A3.001 3.001 0 1 1 20 7.83v8.34A3.001 3.001 0 1 1 16.17 20H7.83zm0-2h8.34A3.008 3.008 0 0 1 18 16.17V7.83A3.008 3.008 0 0 1 16.17 6H7.83A3.008 3.008 0 0 1 6 7.83v8.34A3.008 3.008 0 0 1 7.83 18zM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm14 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM5 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                      </svg>
                    </div>
                    <div
                      className={`${
                        step == "order" ? "text-white" : "text-black"
                      } font-medium group-hover:text-white`}
                    >
                      My order
                    </div>
                  </div>
                  {/* <div
                    className={`${
                      step == "password" ? "bg-black text-white" : null
                    } group flex space-x-4  items-center  shadow-md py-2 px-2 drop-shadow-md hover:bg-black cursor-pointer hover:duration-500`}
                    onClick={() => handleClick("password")}
                  >
                    <div>
                      <svg
                        className={`fill-current group-hover:text-white ${
                          step == "password" ? "text-white" : "text-black"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M18 8h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2V7a6 6 0 1 1 12 0v1zm-2 0V7a4 4 0 1 0-8 0v1h8zm-5 6v2h2v-2h-2zm-4 0v2h2v-2H7zm8 0v2h2v-2h-2z" />
                      </svg>
                    </div>
                    <div
                      className={`${
                        step == "password" ? "text-white" : "text-black"
                      } font-medium group-hover:text-white`}
                    >
                      Change password
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="md:col-span-9  col-span-full ">
              {step == "profile" ? (
                <MyProfile />
              ) : step == "order" ? (
                <MyOrder />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
