import React, { useState } from 'react'
import FreaturedCompo from './FreaturedCompo';
import Featured from '@/Components/Home/Featured';
import request from '@/lib/request';

const TopBranded = ({newData}) => {

 
  const [step, setStep] = useState("featured");

  const handleClick = (value) => {
    setStep(value);
  };

  console.log("newData...", newData);


  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto pt-14 pb-14">
        <div>
          <div className="text-xl text-black tracking-[10px] uppercase text-center pb-5">
            top branded
          </div>

          <div className="text-3xl text-black tracking-[10px] uppercase text-center pb-8">
            products
          </div>

          <div className="flex justify-center items-center space-x-8 pb-5">
            <div
              className={`uppercase tracking-[5px] text-black pb-3 cursor-pointer ${
                step == "featured" ? "border-b" : null
              }  border-black`}
              onClick={() => handleClick("featured")}
            >
              featured
            </div>
            <div
              className={`uppercase tracking-[5px] text-black pb-3 cursor-pointer ${
                step == "popular" ? "border-b" : null
              }  border-black`}
              onClick={() => handleClick("popular")}
            >
              popular
            </div>
            <div
              className={`uppercase tracking-[5px] text-black pb-3 cursor-pointer ${
                step == "category" ? "border-b" : null
              }  border-black`}
              onClick={() => handleClick("category")}
            >
              category
            </div>
          </div>
        </div>
        <div>
          {step == "featured" ? (
            <Featured />
          ) : step == "popular" ? (
             null
          ) : step == "category" ? (
              null
          ) : null}
          {/* <FreaturedCompo /> */}
        </div>
      </div>
    </div>
  );
}

export default TopBranded;

export async function getServerSideProps(context) {
  let res = await request(`get-new-arrival-product`);
 

  return {
    props: {
       newData: res || null,
     
    },
  };
}

