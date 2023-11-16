import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <div>
      <Link href={'/'}>
        <div className="mb-4 cursor-pointer flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text tracking-widest">
          <h1 className=" text-7xl  ">ARZU</h1>
          <p>FOR ALL WOMEN</p>
        </div>
      </Link>
      <div className=" bg-green-300 h-8 my-4 text-center items-center font-semibold">
        <p className=" p-1 "> FREE SHIPPING FOR OVER 1500 LE</p>
      </div>
    </div>
  );
};

export default Header;
