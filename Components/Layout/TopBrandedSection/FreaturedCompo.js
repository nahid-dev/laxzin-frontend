import Image from 'next/image'
import React from 'react'
import ProdOne from "@/public/image/product/prod1.png"
import ProdTwo from "@/public/image/product/prod2.png"
import ProdThree from "@/public/image/product/prod3.png"
import ProdFour from "@/public/image/product/prod4.png";
import { LuEye } from "react-icons/lu";
import { CiHeart } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import Link from 'next/link'

const FreaturedCompo = () => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-10">
        <div className="bg-white">
          <Link href={`/product/make-up`} className="relative group">
            <div className="h-auto w-full">
              <Image src={ProdOne} className="object-contain w-full" />
            </div>
            <div className="absolute bottom-0 hidden group-hover:block w-full cursor-pointer">
              <div className="flex items-center justify-center">
                <div className="h-10 w-10 border border-black flex justify-center items-center">
                  <LuEye size={22} className="text-black" />
                </div>
                <div className="h-10 w-10 border border-black flex justify-center items-center">
                  <CiHeart size={22} className="text-black" />
                </div>
              </div>

              <div className="w-full flex items-center pt-7 ">
                <button className="w-full px-6 py-3 flex justify-center uppercase text-black border border-black card hover:bg-black duration-300">
                  <div>
                    <GoPlus size={20} className="text-black card-icon" />
                  </div>
                  <span className="card-span">add to cart</span>
                </button>
              </div>
            </div>
          </Link>
          <div className="px-3">
            <div className="text-2xl tracking-[6px] text-black pt-6">
              3 IN 1 CONCEALER – CORRECTOR – HIGHLIGHTER
            </div>
            <div className="text-gray-400 font-light text-sm pb-24 pt-5">
              Dermatologically Tested, Waterproof * Matte * Light Wearing,
              Cruelty Free, Vegan, Made In Germany
            </div>
            <div className="text-center text-black font-semibold pb-8 tracking-wider">
              $19.99
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="relative group">
            <div className="h-auto w-full">
              <Image src={ProdTwo} className="object-contain w-full" />
            </div>
            <div className="absolute bottom-0 hidden group-hover:block w-full cursor-pointer">
              <div className="flex items-center justify-center">
                <div className="h-10 w-10 border border-black flex justify-center items-center">
                  <LuEye size={22} className="text-black" />
                </div>
                <div className="h-10 w-10 border border-black flex justify-center items-center">
                  <CiHeart size={22} className="text-black" />
                </div>
              </div>

              <div className="w-full flex items-center pt-7 ">
                <button className="w-full px-6 py-3 flex justify-center uppercase text-black border border-black card hover:bg-black duration-300">
                  <div>
                    <GoPlus size={20} className="text-black card-icon" />
                  </div>
                  <span className="card-span">add to cart</span>
                </button>
              </div>
            </div>
          </div>
          <div className="px-3">
            <div className="text-2xl tracking-[6px] text-black pt-6">
              3 IN 1 CONCEALER – CORRECTOR – HIGHLIGHTER
            </div>
            <div className="text-gray-400 font-light text-sm pb-24 pt-5">
              Dermatologically Tested, Waterproof * Matte * Light Wearing,
              Cruelty Free, Vegan, Made In Germany
            </div>
            <div className="text-center text-black font-semibold pb-8 tracking-wider">
              $19.99
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="relative group">
            <div>
              <Image src={ProdThree} className="object-contain w-full" />
            </div>
            <div className="absolute bottom-0 hidden group-hover:block w-full cursor-pointer">
              <div className="flex items-center justify-center">
                <div className="h-10 w-10 border border-black flex justify-center items-center">
                  <LuEye size={22} className="text-black" />
                </div>
                <div className="h-10 w-10 border border-black flex justify-center items-center">
                  <CiHeart size={22} className="text-black" />
                </div>
              </div>

              <div className="w-full flex items-center pt-7 ">
                <button className="w-full px-6 py-3 flex justify-center uppercase text-black border border-black card hover:bg-black duration-300">
                  <div>
                    <GoPlus size={20} className="text-black card-icon" />
                  </div>
                  <span className="card-span">add to cart</span>
                </button>
              </div>
            </div>
          </div>
          <div className="px-3">
            <div className="text-2xl tracking-[6px] text-black pt-6">
              3 IN 1 CONCEALER – CORRECTOR – HIGHLIGHTER
            </div>
            <div className="text-gray-400 font-light text-sm pb-24 pt-5">
              Dermatologically Tested, Waterproof * Matte * Light Wearing,
              Cruelty Free, Vegan, Made In Germany
            </div>
            <div className="text-center text-black font-semibold pb-8 tracking-wider">
              $19.99
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="relative group">
            <div>
              <Image src={ProdFour} className="object-contain w-full" />
            </div>
            <div className="absolute bottom-0 hidden group-hover:block w-full cursor-pointer">
              <div className="flex items-center justify-center">
                <div className="h-10 w-10 border border-black flex justify-center items-center">
                  <LuEye size={22} className="text-black" />
                </div>
                <div className="h-10 w-10 border border-black flex justify-center items-center">
                  <CiHeart size={22} className="text-black" />
                </div>
              </div>

              <div className="w-full flex items-center pt-7 ">
                <button className="w-full px-6 py-3 flex justify-center uppercase text-black border border-black card hover:bg-black duration-300">
                  <div>
                    <GoPlus size={20} className="text-black card-icon" />
                  </div>
                  <span className="card-span">add to cart</span>
                </button>
              </div>
            </div>
          </div>
          <div className="px-3">
            <div className="text-2xl tracking-[6px] text-black pt-6">
              3 IN 1 CONCEALER – CORRECTOR – HIGHLIGHTER
            </div>
            <div className="text-gray-400 font-light text-sm pb-24 pt-5">
              Dermatologically Tested, Waterproof * Matte * Light Wearing,
              Cruelty Free, Vegan, Made In Germany
            </div>
            <div className="text-center text-black font-semibold pb-8 tracking-wider">
              $19.99
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreaturedCompo