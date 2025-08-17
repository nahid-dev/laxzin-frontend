import React from "react";
import Button from "./Button";
import useTypewriterPlaceholder from "@/hooks/useTypewriterPlaceholder";

const CommonbgBanner = ({
  name,
  helperText,
  enableSearch,
  searchValue = "",
  onInputChange,
}) => {
  const placeholder = useTypewriterPlaceholder(
    ["Search products...", "Enter product name..."],
    120,
    1500
  );

  const handleInputChange = (e) => {
    if (onInputChange) onInputChange(e.target.value);
  };

  return (
    <>
      <div className="relative text-white py-6 sm:py-10 px-4 overflow-hidden bg-gradient-to-r from-black via-blue-950 to-black ">
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center justify-center mb-2">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/30"></div>
              <div className="mx-4 w-2 h-2 bg-white rotate-45"></div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/30"></div>
            </div>

            <h1 className="text-2xl md:text-6xl font-thin tracking-[0.2em] mb-6 relative text-white uppercase">
              {name}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
            </h1>

            {helperText && (
              <p className="text-sm sm:text-base font-thin text-gray-300 max-w-2xl mx-auto leading-relaxed tracking-wide">
                {helperText}
              </p>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

        {enableSearch ? (
          <div className="mx-auto w-full max-w-2xl flex items-center justify-center mt-2 md:mt-5">
            <div className="w-full">
              <input
                type="text"
                value={searchValue}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="bg-transparent px-4 py-2 border border-gray-600 rounded-full rounded-r-none focus:ring-0 focus:outline-none w-full"
              />
            </div>
            <Button className="py-[9px] focus:ring-0 focus:outline-none rounded-e-full">
              Search
            </Button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default CommonbgBanner;
