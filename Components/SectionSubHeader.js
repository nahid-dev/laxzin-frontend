import React from "react";

const SectionSubHeader = ({title, helperText}) => {
  return (
    <div className="space-x-2">
      <h2 className="text-sm md:text-xl inline text-primary dark:text-white font-semibold">
        {title}
      </h2>
      <p className="text-gray-600 text-sm hidden md:inline">
        - {helperText}
      </p>
    </div>
  );
};

export default SectionSubHeader;
