import React, { useState } from 'react'
import { Slider } from "antd";

const LeftMenu = () => {
 
     const [sliderValue, setSliderValue] = useState([1200, 2100]);

     const handleSliderChange = (value) => {
       setSliderValue(value);
     };

  return (
    <div>
      <p className="text-2xl tracking-[4px] uppercase">Product categories</p>

      <div className="mt-3">
        <div className="border-b border-gray-200">
          <ul className="pb-3">
            <p className="capitalize font-light">Accessories</p>
            <ul className="pl-5">
              <li className="text-sm list-none">sharpner</li>
            </ul>
          </ul>
          <ul className="pb-3">
            <p className="capitalize font-light">Eye</p>
            <ul className="pl-5">
              <li className="text-sm list-none">Eye Liner</li>
              <li className="text-sm list-none">Kajal</li>
              <li className="text-sm  list-none">Mas cara</li>
            </ul>
          </ul>
          <ul className="pb-3">
            <p className="capitalize font-light">Face</p>
            <ul className="pl-5">
              <li className="text-sm list-none">corrector & Highlighter</li>
              <li className="text-sm list-none">pressed powder</li>
            </ul>
          </ul>
          <ul className="pb-3">
            <p className="capitalize font-light">Lips</p>
            <ul className="pl-5">
              <li className="text-sm list-none">Lip liner</li>
              <li className="text-sm list-none">Lipstick</li>
            </ul>
          </ul>
        </div>
        <div className="py-3">
          <p className="text-2xl tracking-[5px] uppercase">price</p>

          <Slider
            range
            max={4000}
            value={sliderValue}
            onChange={handleSliderChange}
          />

          <p className="pt-3">
            Price:{" "}
            <span className="font-bold">
              {sliderValue[0]}৳ — {sliderValue[1]}৳
            </span>{" "}
          </p>

          <div className="w-full px-4 mt-3">
            <button className="uppercase text-sm border border-black text-black w-full py-3  tracking-[3px] hover:bg-black hover:text-white duration-300">
              filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftMenu