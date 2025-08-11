import React from 'react'

const CommonbgBanner = ({name}) => {
  return (
    <div className="w-full bg-[url('/image/background.png')] bg-center bg-custom-background bg-repeat  h-[300px]">
      <div className="text-4xl tracking-[10px] uppercase  text-center flex h-full items-center justify-center">
        {name}
      </div>
    </div>
  );
}

export default CommonbgBanner