import React from "react";

const SectionHeader = ({ title, className, subtitle }) => {
  return (
    <div className={`text-center mb-6 md:mb-10 lg:mb-12 ${className}`}>
      {/* Decorative line with geometric elements */}
      <div className="flex items-center justify-center mb-0 sm:mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-px bg-gradient-to-r from-transparent to-gray-200"></div>
          <div className="size-1 md:size-2 bg-gray-200 transform rotate-45"></div>
          <div className="w-16 h-px bg-gray-200"></div>
          <div className="size-2 md:size-3 border border-gray-200 transform rotate-45"></div>
          <div className="w-16 h-px bg-gray-200"></div>
          <div className="size-1 md:size-2 bg-gray-200 transform rotate-45"></div>
          <div className="w-8 h-px bg-gradient-to-l from-transparent to-gray-200"></div>
        </div>
      </div>

      {/* Main title with gradient text and hover effect */}
      <h2 className="text-xl md:text-4xl font-thin mb-0 sm:mb-3 tracking-[0.15em] sm:tracking-[0.25em] bg-gradient-to-r from-gray-600 via-white to-gray-600 bg-clip-text text-transparent relative transition-all duration-500">
        {title}
        {/* Underline accent */}
        <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-black to-transparent"></div>
        <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-black rounded-full"></div>
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p class="text-gray-600 text-base sm:text-lg font-light tracking-[0.1em] mt-3 sm:mt-5 px-4">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
