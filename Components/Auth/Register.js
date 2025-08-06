import { useStatus } from "@/context/contextStatus";
import postRequest from "@/lib/postRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const Register = () => {
 

  const [visible, setVisible] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);

  const router = useRouter();

  const bdMobilePattern = /^(\+)?(88)?01[3-9]\d{8}$/;

  const phoneValidation = yup
    .string()
    .required("The field is required")
    .matches(bdMobilePattern, "Not a valid phone number")
    .min(11, "Phone number should be 11 characters")
    .max(11, "Phone number should be 11 characters");

  const schema = yup.object().shape({
    name: yup.string().required("The field is required"),
    phone: phoneValidation,

    password: yup
      .string()
      .min(4, "Password should be at least 4 characters")
      .required("This field is required"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "confirm passwords must match"),
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const toggleBtn = () => {
    setVisible(!visible);
  };

  const toggleBtnConfirm = () => {
    setVisibleConfirm(!visibleConfirm);
  };



  

  const handleRegister = async (data) => {
    
   delete data?.confirm_password;

   const configureData = {
     name: data?.name,
     phone: data?.phone,
     password: data?.password,
     website: "laxzin.com",
   };

    let res = await postRequest(`registration`, configureData);
    if (res?.status) {
      toast(`${res?.message}`);
      router.push(`/otp`);
      // setTabIndex(1)
    } else {
      toast.error(`${res?.error}`);
    }
  };

  return (
    <div className="mt-4 pb-6">
      <form className="space-y-5" onSubmit={handleSubmit(handleRegister)}>
        <div className="relative">
          <div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name"
              {...register("name")}
            />
          </div>
          <div className="absolute top-11 md:left-0 left-0 text-red-600 text-sm">
            {errors.name?.message}
          </div>
        </div>

        <div className="relative">
          <div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Phone number"
              {...register("phone")}
            />
          </div>
          <div className="absolute top-11 md:left-0 left-0 text-red-600 text-sm">
            {errors.phone?.message}
          </div>
        </div>

        <div className="relative">
          <div>
            <input
              type={visible ? "text" : "password"}
              className="bg-gray-50 border border-gray-300 text-black dark:text-black text-sm rounded-lg  block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter password"
              {...register("password")}
            />
            <div onClick={toggleBtn}>
              {visible ? (
                <svg
                  className="absolute top-2 right-2 text-gray-400 fill-current h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M17.882 19.297A10.949 10.949 0 0 1 12 21c-5.392 0-9.878-3.88-10.819-9a10.982 10.982 0 0 1 3.34-6.066L1.392 2.808l1.415-1.415 19.799 19.8-1.415 1.414-3.31-3.31zM5.935 7.35A8.965 8.965 0 0 0 3.223 12a9.005 9.005 0 0 0 13.201 5.838l-2.028-2.028A4.5 4.5 0 0 1 8.19 9.604L5.935 7.35zm6.979 6.978l-3.242-3.242a2.5 2.5 0 0 0 3.241 3.241zm7.893 2.264l-1.431-1.43A8.935 8.935 0 0 0 20.777 12 9.005 9.005 0 0 0 9.552 5.338L7.974 3.76C9.221 3.27 10.58 3 12 3c5.392 0 9.878 3.88 10.819 9a10.947 10.947 0 0 1-2.012 4.592zm-9.084-9.084a4.5 4.5 0 0 1 4.769 4.769l-4.77-4.769z" />
                </svg>
              ) : (
                <svg
                  className="absolute top-2 right-2 text-gray-400 fill-current h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9C2.121 6.88 6.608 3 12 3zm0 16a9.005 9.005 0 0 0 8.777-7 9.005 9.005 0 0 0-17.554 0A9.005 9.005 0 0 0 12 19zm0-2.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                </svg>
              )}
            </div>
          </div>
          <div className="absolute top-11 md:left-0 left-0 text-red-600 text-sm">
            {errors.password?.message}
          </div>
        </div>
        <div className="relative">
          <div>
            <input
              type={visibleConfirm ? "text" : "password"}
              className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:text-black"
              placeholder="Enter confirm password"
              {...register("confirm_password")}
            />
            <div onClick={toggleBtnConfirm}>
              {visibleConfirm ? (
                <svg
                  className="absolute top-2 right-2 text-gray-400 fill-current h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M17.882 19.297A10.949 10.949 0 0 1 12 21c-5.392 0-9.878-3.88-10.819-9a10.982 10.982 0 0 1 3.34-6.066L1.392 2.808l1.415-1.415 19.799 19.8-1.415 1.414-3.31-3.31zM5.935 7.35A8.965 8.965 0 0 0 3.223 12a9.005 9.005 0 0 0 13.201 5.838l-2.028-2.028A4.5 4.5 0 0 1 8.19 9.604L5.935 7.35zm6.979 6.978l-3.242-3.242a2.5 2.5 0 0 0 3.241 3.241zm7.893 2.264l-1.431-1.43A8.935 8.935 0 0 0 20.777 12 9.005 9.005 0 0 0 9.552 5.338L7.974 3.76C9.221 3.27 10.58 3 12 3c5.392 0 9.878 3.88 10.819 9a10.947 10.947 0 0 1-2.012 4.592zm-9.084-9.084a4.5 4.5 0 0 1 4.769 4.769l-4.77-4.769z" />
                </svg>
              ) : (
                <svg
                  className="absolute top-2 right-2 text-gray-400 fill-current h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9C2.121 6.88 6.608 3 12 3zm0 16a9.005 9.005 0 0 0 8.777-7 9.005 9.005 0 0 0-17.554 0A9.005 9.005 0 0 0 12 19zm0-2.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                </svg>
              )}
            </div>
          </div>
          <div className="absolute top-11 md:left-0 left-0 text-red-600 text-sm">
            {errors.confirm_password?.message}
          </div>
        </div>

        <button
          type="submit"
          className="flex justify-center bg-black py-3 rounded-md w-full text-white font-semibold tracking-wider"
        >
          Create account
        </button>
      </form>
    </div>
  );
};

export default Register;
