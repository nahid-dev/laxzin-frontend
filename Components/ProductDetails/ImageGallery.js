import Image from "next/image";

import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useState } from "react";
import ImageGalleryCard from "./ImageGalleryCard";
import { Zoom } from "reactjs-image-zoom";
import { imageHostName } from "@/lib/config";
import { BsInfoCircleFill } from "react-icons/bs";

const ImageGallery = ({
  data,
  selectedIndex,
  handleImageClick,
  selectedNormalIndex,
  handleVariationImageClick,
  setSelectedIndex,
  clickFlag,
  setClickFlag,
}) => {
  const [isOptimized, setIsOptimized] = useState(true);

  const props = {
    img:
      !clickFlag && data?.image
        ? imageHostName +
          "/storage/product/" +
          encodeURIComponent(data?.image[selectedNormalIndex])
        : data?.product_variation_status == 1 &&
          data?.product_variants &&
          data?.product_variants[selectedIndex]?.image
        ? imageHostName +
          "/storage/product/" +
          encodeURIComponent(data?.product_variants[selectedIndex]?.image[0])
        : "/assets/placeholder_600x.webp",
  };

  const getImageSrc = () => {
    const basePath = imageHostName + "/storage/product/";

    if (!clickFlag && data?.image) {
      return basePath + encodeURIComponent(data.image[selectedNormalIndex]);
    }

    if (
      data?.product_variation_status === 1 &&
      data?.product_variants &&
      data.product_variants[selectedIndex]?.image?.[0]
    ) {
      return (
        basePath +
        encodeURIComponent(data.product_variants[selectedIndex].image[0])
      );
    }

    return "/assets/placeholder_600x.webp";
  };

  const handleDownload = async () => {
    try {
      const imageUrl = getImageSrc();
      ``;
      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch image.");
      }

      // Create Blob and trigger download
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${data?.product_name || "download"}.jpg`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl); // Free memory
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  const CustomPrevArrow = (props) => {
    const { onClick } = props;

    const handleBack = () => {
      if (data?.product_variation_status == 1) {
        setSelectedIndex((prev) => {
          if (prev > 0) {
            return prev - 1; // Decrement if not at the beginning
          } else {
            return data?.product_variants?.length - 1; // Cycle back to the maximum index
          }
        });
        setClickFlag(true);
      } else {
        setSelectedIndex((prev) => {
          if (prev > 0) {
            return prev - 1; // Decrement if not at the beginning
          } else {
            return data?.image && data?.image?.length - 1; // Cycle back to the maximum index
          }
        });
      }
    };

    return (
      <div className="custom-prev-arrow" onClick={onClick}>
        <button
          onClick={() => handleBack()}
          className="h-[40px] w-[40px] rounded-full shadow-xl drop-shadow-lg  transition duration-200 bg-slate-50 text-black grid place-items-center cursor-pointer"
        >
          <MdOutlineKeyboardArrowUp size={20} />
        </button>
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;

    const handleForward = () => {
      if (data?.product_variation_status == 1) {
        setSelectedIndex((prev) => {
          if (prev < data?.product_variants?.length - 1) {
            return prev + 1; // Increment if not at the end
          } else {
            return 0; // Reset to 0 if at the end
          }
        });
        setClickFlag(true);
      } else {
        setSelectedIndex((prev) => {
          if (prev < data?.image && data?.image?.length - 1) {
            return prev + 1; // Increment if not at the end
          } else {
            return 0; // Reset to 0 if at the end
          }
        });
      }
    };

    return (
      <div className="custom-next-arrow" onClick={onClick}>
        <button
          onClick={() => handleForward()}
          className="h-[40px] w-[40px] rounded-full shadow-xl drop-shadow-lg  transition duration-200 bg-slate-50 text-black grid place-items-center cursor-pointer"
        >
          <MdKeyboardArrowDown size={20} />
        </button>
      </div>
    );
  };

  const CustomSmallPrevArrow = (props) => {
    const { onClick } = props;

    const handleBack = () => {
      if (data?.product_variation_status == 1) {
        setSelectedIndex((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            return data?.product_variants?.length - 1;
          }
        });
        setClickFlag(true);
      } else {
        setSelectedIndex((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            return data?.image && data?.image?.length - 1;
          }
        });
      }
    };

    return (
      <div className="custom-small-prev-arrow" onClick={onClick}>
        <button
          onClick={() => handleBack()}
          className="h-[30px] w-[30px] rounded-full shadow-xl drop-shadow-lg  transition duration-200 bg-slate-50 text-black grid place-items-center cursor-pointer"
        >
          <MdOutlineKeyboardArrowLeft size={20} />
        </button>
      </div>
    );
  };

  const CustomSmallNextArrow = (props) => {
    const { onClick } = props;

    const handleForward = () => {
      if (data?.product_variation_status == 1) {
        setSelectedIndex((prev) => {
          if (prev < data?.product_variants?.length - 1) {
            return prev + 1; // Increment if not at the end
          } else {
            return 0; // Reset to 0 if at the end
          }
        });
        setClickFlag(true);
      } else {
        setSelectedIndex((prev) => {
          if (prev < data?.image && data?.image?.length - 1) {
            return prev + 1; // Increment if not at the end
          } else {
            return 0; // Reset to 0 if at the end
          }
        });
      }
    };

    return (
      <div className="custom-small-next-arrow" onClick={onClick}>
        <button
          onClick={() => handleForward()}
          className="h-[30px] w-[30px] rounded-full shadow-xl drop-shadow-lg  transition duration-200 bg-slate-50 text-black grid place-items-center cursor-pointer"
        >
          <MdOutlineKeyboardArrowRight size={20} />
        </button>
      </div>
    );
  };

  return (
    <div>
      <div className="bg-white col-span-1 p-2 md:grid hidden grid-cols-6 gap-8 border sm:gap-0 sm:rounded-sm !rounded-xl">
        <div className="mt-10">
          <div>
            {data?.product_variation_status == 1 ? (
              <div className="relative ">
                {data?.product_variants &&
                data?.product_variants?.length > 5 ? (
                  <Slider
                    slidesToShow={5}
                    slidesToScroll={1}
                    vertical={true}
                    verticalSwiping={true}
                    prevArrow={<CustomPrevArrow />}
                    nextArrow={<CustomNextArrow />}
                  >
                    {data?.product_variants?.map((item, index) => (
                      <div
                        key={index}
                        className={`relative w-[60px] h-[60px]  border-[2px] ${
                          selectedIndex == index && clickFlag
                            ? "border-tahiti-500"
                            : "border-gray-200"
                        } rounded-md cursor-pointer`}
                        onClick={() =>
                          handleVariationImageClick(item?.id, index)
                        }
                      >
                        {item?.image ? (
                          <ImageGalleryCard image={item?.image[0]} />
                        ) : (
                          <Image
                            className="rounded-md object-cover h-full w-full"
                            src={`/assets/placeholder_600x.webp`}
                            width={500}
                            height={100}
                            priority
                            alt="product"
                          />
                        )}
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div>
                    {data?.product_variants?.map((item, index) => (
                      <div
                        key={index}
                        className={`relative w-[60px] h-[60px]  border-[2px] ${
                          selectedIndex == index && clickFlag
                            ? "border-tahiti-500"
                            : "border-gray-200"
                        } rounded-md mb-2 cursor-pointer`}
                        onClick={() =>
                          handleVariationImageClick(item?.id, index)
                        }
                      >
                        {item?.image ? (
                          <ImageGalleryCard image={item?.image[0]} />
                        ) : (
                          <Image
                            className="rounded-md object-cover h-full w-full"
                            src={`/assets/placeholder_600x.webp`}
                            width={500}
                            height={100}
                            priority
                            alt="product"
                          />
                        )}
                      </div>
                    ))}

                    {data?.image?.map((item, index) => (
                      <div
                        key={index}
                        className={`relative w-[60px] h-[60px]    border-[2px] ${
                          selectedNormalIndex == index && !clickFlag
                            ? "border-tahiti-500"
                            : "border-gray-200"
                        } rounded-md mb-2 cursor-pointer`}
                        onClick={() => handleImageClick(index)}
                      >
                        {item ? (
                          <ImageGalleryCard image={item} />
                        ) : (
                          <Image
                            className="rounded-md object-cover h-full w-full"
                            src={`/assets/placeholder_600x.webp`}
                            width={500}
                            height={100}
                            priority
                            alt="product"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                {data?.image && data?.image?.length > 5 ? (
                  <Slider
                    slidesToShow={5}
                    slidesToScroll={1}
                    vertical={true}
                    verticalSwiping={true}
                    prevArrow={<CustomPrevArrow />}
                    nextArrow={<CustomNextArrow />}
                  >
                    {data?.image?.map((item, index) => (
                      <div
                        key={index}
                        className={`relative w-[60px] h-[60px]    border-[2px] ${
                          selectedIndex == index && clickFlag
                            ? "border-tahiti-500"
                            : "border-gray-200"
                        } rounded-md cursor-pointer`}
                        onClick={() => handleImageClick(index)}
                      >
                        {item ? (
                          <ImageGalleryCard image={item} />
                        ) : (
                          <Image
                            className="rounded-md object-cover h-full w-full"
                            src={`/assets/placeholder_600x.webp`}
                            width={500}
                            height={100}
                            priority
                            alt="product"
                          />
                        )}
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="pb-2">
                    {data?.image?.map((item, index) => (
                      <div
                        key={index}
                        className={`relative w-[60px] h-[60px]    border-[2px] ${
                          selectedIndex == index && clickFlag
                            ? "border-tahiti-500"
                            : "border-gray-200"
                        } rounded-md mb-2 cursor-pointer`}
                        onClick={() => handleImageClick(index)}
                      >
                        {item ? (
                          <ImageGalleryCard image={item} />
                        ) : (
                          <Image
                            className="rounded-md object-cover h-full w-full"
                            src={`/assets/placeholder_600x.webp`}
                            width={500}
                            height={100}
                            priority
                            alt="product"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-5 col-span-full">
          <div className="relative  rounded-md cursor-pointer w-full  xxxsm:h-[300px] xsm:h-[300px] xs:h-[320px] sm:h-[380px] md:h-[500px]">
            <Zoom
              width={150}
              height={400}
              maxwidth={400}
              repeat="repeat"
              position="center"
              imagesrc={getImageSrc()}
              size={200}
              bgsize="cover"
              cursor="zoom-in"
              style={{ margin: "0px" }}
            />
          </div>
        </div>
      </div>

      <div className="md:hidden block bg-white">
        <div className="relative  rounded-md cursor-pointer w-full  xxxsm:h-[300px] xsm:h-[300px] xs:h-[320px] sm:h-[380px] md:h-[500px]">
          <Image
            className="rounded-md object-contain h-full w-full"
            height={500}
            width={500}
            src={isOptimized ? props.img : "/assets/placeholder_600x.webp"}
            alt="product image"
            priority
            unoptimized={!isOptimized}
            onError={() => setIsOptimized(false)}
          />
        </div>
        <div className="mt-4">
          {data?.product_variation_status == 1 ? (
            <div className="relative">
              {data?.product_variants && data?.product_variants?.length > 5 ? (
                <Slider
                  slidesToShow={5}
                  slidesToScroll={1}
                  prevArrow={<CustomSmallPrevArrow />}
                  nextArrow={<CustomSmallNextArrow />}
                >
                  {data?.product_variants?.map((item, index) => (
                    <div
                      key={index}
                      className={`relative w-[40px] h-[100px] xls:h-[70px] xms:h-[60px] xs:h-[55px] p-[8px] xls:p-[5px] xms:p-[5px] xs:p-[4px] rounded-md cursor-pointer `}
                      onClick={() => handleVariationImageClick(item?.id, index)}
                    >
                      {item?.image && item?.image?.length > 0 ? (
                        <ImageGalleryCard image={item?.image[0]} />
                      ) : (
                        <Image
                          className="rounded-md object-cover h-full w-full"
                          src={`/assets/placeholder_600x.webp`}
                          width={500}
                          height={100}
                          priority
                          alt="product"
                        />
                      )}
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="grid grid-cols-5 gap-2">
                  {data?.product_variants?.map((item, index) => (
                    <div
                      key={index}
                      className={`relative  rounded-md cursor-pointer `}
                      onClick={() => handleVariationImageClick(item?.id, index)}
                    >
                      {item?.image && item?.image?.length > 0 ? (
                        <ImageGalleryCard image={item?.image[0]} />
                      ) : (
                        <Image
                          className="rounded-md object-cover h-full w-full"
                          src={`/assets/placeholder_600x.webp`}
                          width={500}
                          height={100}
                          priority
                          alt="product"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="relative">
              {data?.image && data?.image?.length > 5 ? (
                <Slider
                  slidesToShow={5}
                  slidesToScroll={1}
                  prevArrow={<CustomSmallPrevArrow />}
                  nextArrow={<CustomSmallNextArrow />}
                >
                  {data?.image?.map((item, index) => (
                    <div
                      key={index}
                      className={`relative w-[40px] h-[100px] xls:h-[70px] xms:h-[60px] xs:h-[55px] p-[8px] xls:p-[5px] xms:p-[5px] xs:p-[4px] rounded-md cursor-pointer `}
                      onClick={() => handleImageClick(index)}
                    >
                      {item && item?.length > 0 ? (
                        <ImageGalleryCard image={item} />
                      ) : (
                        <Image
                          className="rounded-md object-cover h-full w-full"
                          src={`/assets/placeholder_600x.webp`}
                          width={500}
                          height={100}
                          priority
                          alt="product"
                        />
                      )}
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="grid grid-cols-5 gap-2">
                  {data?.image?.map((item, index) => (
                    <div
                      key={index}
                      className={`relative  rounded-md cursor-pointer `}
                      onClick={() => handleImageClick(index)}
                    >
                      {item && item?.length > 0 ? (
                        <ImageGalleryCard image={item} />
                      ) : (
                        <Image
                          className="rounded-md object-cover h-full w-full"
                          src={`/assets/placeholder_600x.webp`}
                          width={500}
                          height={100}
                          priority
                          alt="product"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* DISCLAIMER */}
      <div className="rounded-2xl border bg-amber-50 border-amber-200 p-2 xs:p-4 text-amber-800 shadow-sm mt-5 hidden xs:block">
        <div className="flex items-start gap-3">
          <BsInfoCircleFill
            className="size-4 xs:size-5 mt-0.5 shrink-0"
            aria-hidden
          />
          <div>
            <p className="font-semibold text-sm xs:text-base">Declaimer:</p>
            <div className="text-xs md:text-sm leading-6">
              <div dangerouslySetInnerHTML={{ __html: data?.disclaimer }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
