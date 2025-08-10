import React from "react";

const SectionHeader = ({icon,badgeTheme, badgeText, title, helperText}) => {
  return (
    <div className="text-center flex flex-col gap-1 items-center  max-w-7xl mx-auto w-full">
      <div
        className={`inline-flex gap-2 items-center justify-center ${badgeTheme.bgColor} ${badgeTheme.textColor} px-4 py-1.5 rounded-full text-[10px] md:text-xs font-medium`}
      >
        {icon} {badgeText}
      </div>
      <h2 className="font-medium text-primary dark:text-white text-xl lg:text-2xl !leading-none">
        {title}
      </h2>
      <p className="max-w-2xl mx-auto text-gray-600 dark:text-white">
        {helperText}
      </p>
    </div>
  );
};

export default SectionHeader;
