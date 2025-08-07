import { useStatus } from '@/context/contextStatus';
import { useRouter } from 'next/router';
import React from 'react'


const SearchModal = () => {
 
    const { searchModal, setSearchModal } = useStatus(); 

    const router = useRouter();

       const search = (val) => {
         
         if (val !== "") {
          
           router.push(`/search/${val}`);
         } else {
           router.push(`/`);
         }
       };
  
    const handleClose = () =>{
        setSearchModal(false);
    }
     
   

  return (
    <>
      {searchModal && (
        <div className="fixed top-0 left-0 h-screen w-full z-50 md:bg-[#fffffff2] bg-[#25201ef2]">
          <div className="px-3  pt-8 mx-4">
            <div className="flex justify-end items-center ">
              <div onClick={() => handleClose()} className="cursor-pointer">
                <svg
                  className="fill-current md:text-black text-white h-10 w-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 28 28"
                  width="28"
                  height="28"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                </svg>
              </div>
            </div>

            <div className="pt-14 md:text-black text-white">
              <div>
                <p className="md:text-2xl text-lg  tracking-[6px] text-center">
                  WHAT YOU ARE LOOKING FOR?
                </p>

                <div className="flex justify-center pt-10">
                  <input
                    placeholder="Search by keywords"
                    className={` sm:w-[500px] w-full  bg-transparent  outline-none placeholder:text-sm md:placeholder:text-black placeholder:text-white border-b placeholder:font-light border-gray-200`}
                    type="text"
                    onChange={(e) => search(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SearchModal