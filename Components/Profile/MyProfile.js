import { useStatus } from "@/context/contextStatus";
import postRequest from "@/lib/postRequest";
import request from "@/lib/request";
import Image from "next/image";

import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { setImage, token } = useStatus();

  const [imageUrl, setimageUrl] = useState("");

  const [avatarName, setAvatarName] = useState("");

  const [address, setAddress] = useState("");

  const [phone, setPhone] = useState("");

  const [info, setInfo] = useState("");

  const [isAlive, setIsAlive] = useState(false);

  const [userProfileData, setUserProfileData] = useState({});

  const [loading, setLoading] = useState(true);

  const [gender, setGender] = useState(null);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handlePicChange = async (data) => {
    let file = data[0];
    const base64 = await convertBase64(file);
    setimageUrl(base64);
  };


  

  useEffect(() => {
    if (token) {
      const profileData = async () => {
        let res = await request(`my-profile`);
  
        setAddress(res?.data?.information);
        setAvatarName(res?.data?.name);
        setGender(res?.data?.gender);
        setPhone(res?.data?.phone);
        setInfo(res?.data?.information);
        setUserProfileData(res?.data);
        setLoading(false);
      };
      profileData();
    }
  }, [isAlive]);

  useEffect(() => {
    setImage(userProfileData?.avatar);
  }, [userProfileData]);

    const handleSubmit = async () => {
      if (phone) {
        var bdMobilePattern = /^(\+)?(88)?01[3-9]\d{8}$/;
        if (bdMobilePattern.test(phone)) {
        } else {
          toast.error("Not a valid phone number");

          return;
        }
      }
      let res = await postRequest(`update-profile`, {
        name: avatarName ? avatarName : "",
        information: address,
        phone: phone,
        avatar: imageUrl ? imageUrl : "",
        gender: gender,
      });
      if (res?.success) {
        toast.success(`${res?.message}`);
        setIsAlive(!isAlive);
      } else {
        toast.error(`${res?.message}`);
      }
    };

  return (
    <div className="bg-white p-3 rounded-md">
      <div className="flex space-x-2 items-center">
        <svg
          className="fill-current text-black"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M4 22a8 8 0 1 1 16 0h-2a6 6 0 1 0-12 0H4zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
        </svg>
        <h1 className="font-semibold text-2xl">
          <span className="text-black">Profile</span>{" "}
        </h1>
      </div>
      <div className="p-3 rounded-md">
        <div>
          <div>
            <div className="py-4 w-[200px]">
              <label className="text-black">Your Profile Image</label>
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => handlePicChange(e.target.files)}
              />
              {imageUrl ? (
                <div className="py-2">
                  <Image
                    alt="image"
                    width={100}
                    height={100}
                    src={`${imageUrl}`}
                  />
                </div>
              ) : loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "170px",
                  }}
                >
                  {" "}
                  <ThreeDots
                    height="30"
                    width="80"
                    radius="9"
                    color="#1F2937"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    visible={true}
                  />
                </div>
              ) : userProfileData == undefined ||
                userProfileData?.avatar == "" ? null : (
                <div className="mt-2">
                  <img
                    src={`${userProfileData?.avatar}`}
                    className="h-[150px] w-[150px]"
                    onError={(e) => {
                      e.target.src = "/assets/placeholder_600x.webp";
                    }}
                  />
                </div>
              )}
            </div>

            <div className="w-full">
              <div className="text-sm font-normal  py-2 text-black">Name</div>
              <input
                className=" h-[40px] w-full pl-2 rounded-md outline-none bg-white text-black border border-black placeholder:text-sm text-sm"
                placeholder="Enter name..."
                defaultValue={avatarName}
                onChange={(e) => setAvatarName(e.target.value)}
              />
            </div>

            <div className="w-full">
              <div className="text-sm font-normal  py-2 text-black">Phone</div>
              <input
                className=" h-[40px] w-full pl-2 rounded-md outline-none bg-white text-black border border-black placeholder:text-sm text-sm"
                placeholder="Enter phone number..."
                defaultValue={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="w-full mt-3">
              <label
                for="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Address details
              </label>
              <textarea
                defaultValue={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder="please give address...."
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></textarea>
            </div>
          </div>
          <div className="mt-2 flex justify-end">
            <button
              className="bg-black border-2  text-white hover:bg-white hover:border-black hover:text-black px-8 py-1  cursor-pointer"
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
