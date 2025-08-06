import CommonbgBanner from '@/Components/Common/CommonbgBanner'
import React from 'react'

import LeftMenu from '@/Components/Shop/LeftMenu';
import RightMenu from '@/Components/Shop/RightMenu';

const Shop = () => {

 


  return (
    <div className="bg-[#F3F3F3]">
      <CommonbgBanner name={`shop`} />

      <div className="xxl:max-w-[95rem] xl:max-w-[95rem] lg:max-w-[65rem] md:max-w-[60rem] sm:max-w-[36rem] xs:max-w-[32rem] xsm:max-w-[25rem] xxsm:max-w-[20rem] xxxsm:max-w-[18rem] mx-auto">
        <div className="grid grid-cols-12 gap-6 py-10">
          <div className="bg-white text-black md:col-span-3 md:block hidden px-5 py-3 ">
            <LeftMenu />
          </div>
          <div className="md:col-span-9 col-span-full">
            <RightMenu />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop