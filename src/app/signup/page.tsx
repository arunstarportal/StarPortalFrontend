import React from "react";

const page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen border border-red-500">
      <div className="h-screen w-1/2 border-[#292929] border-r relative">
        <div className="w-full h-full overflow-hidden ">
          <img
            src="/v2.jpeg"
            alt=""
            className="w-full h-full scale-150 relative right-40 opacity-20"
          />
        </div>
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-medium text-8xl w-[80%] text-center">
          Start your Defi journey Today.
        </p>
      </div>
      <div className="h-screen w-1/2 flex items-center justify-center flex-col">
        <img src="/logo.png" alt="" className="w-20 h-20 object-contain" />
        <h1 className="text-white/80 text-xl">Set up your account</h1>
        <input type="text" className="w-14" />
      </div>
    </div>
  );
};

export default page;
