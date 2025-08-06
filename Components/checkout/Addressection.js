import React from 'react'

const Addressection = ({
  name,
  setName,
  phone,
  setPhone,
  address,
  setAddress,
  deliveryData,
  handleArea,
  
}) => {
  return (
    <div className="bg-white p-8">
      <div>
        <div className="pb-4">
          <div className="text-sm font-light tracking-wider text-black uppercase">
            Name <span style={{ color: "red" }}>*</span>{" "}
          </div>
          <input
            className=" h-[40px] w-full pl-2 py-4  outline-none bg-gray-200 text-sm text-black placeholder:text-sm"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="pb-4">
          <div className="text-sm font-light tracking-wider text-black uppercase">
            phone <span style={{ color: "red" }}>*</span>{" "}
          </div>
          <input
            className=" h-[40px] w-full pl-2 py-4  outline-none bg-gray-200 text-sm text-black placeholder:text-sm"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
        <div className="pb-4">
          <div className="text-sm font-light tracking-wider text-black uppercase">
            full address <span style={{ color: "red" }}>*</span>{" "}
          </div>
          <input
            className=" h-[40px] w-full pl-2 py-4  outline-none bg-gray-200 text-sm text-black placeholder:text-sm"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>
        <div className="w-full">
          <div className="text-sm font-light tracking-wider text-black uppercase">
            Select your area <span style={{ color: "red" }}>*</span>{" "}
          </div>

          <select
            className="bg-gray-50 mt-1 h-[40px] border border-gray-300 text-black text-sm outline-none  block w-full "
            onChange={(e) => handleArea(e.target.value)}
          >
            {deliveryData?.map((item, index) => (
              <option value={item?.value} key={index}>
                {item?.name} (BDT {item?.value})
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Addressection