import Link from 'next/link';
import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-100 ">
      <div className="grid grid-cols-2 md:grid-cols-4 pt-4">
        <div>
          <p className="text-3xl  px-1 text-center font-poppins font-semibold ">
            CUSTOMER CARE
          </p>
          <p className="text-center text-lg">------</p>
          <div className="text-center font-poppins font-thin space-y-3">
            <Link href={'/returnAndExchange'}>
              <p className=" text-lg">Return & Exchange</p>
            </Link>

            <p className=" text-lg">Fabric care</p>
            <p className=" text-lg">Order Tracking</p>
          </div>
        </div>
        <div>
          <p className="text-3xl px-1 text-center font-poppins font-semibold ">
            OUR BRAND
          </p>
          <p className="text-center text-lg">------</p>
          <div className="text-center font-poppins font-thin font-xs space-y-3">
            <p className=" text-lg">About Us</p>
            <p className=" text-lg">Gift Cards</p>
            <p className=" text-lg">Career</p>
          </div>
        </div>
        <div>
          <p className="text-3xl px-1 pt-4 md:pt-0 text-center font-poppins font-semibold ">
            CONNECT
          </p>
          <p className="text-center text-lg">------</p>
          <div className="text-center font-poppins font-thin space-y-3">
            <p className=" text-lg">Contact us</p>
            <p className=" text-lg">Wholesale</p>
          </div>
        </div>
        <div>
          <p className="text-3xl px-1 pt-4 md:pt-0 text-center font-poppins font-semibold ">
            SUPPORT
          </p>
          <p className="text-center text-lg">------</p>
          <div className="text-center font-poppins font-thin font-xs space-y-3">
            <p className=" text-xs">Privacy Policy</p>
            <p className=" text-xs">Terms Of Use</p>
            <p className=" text-xs">Shipping Policy</p>
          </div>
        </div>
      </div>
      <div className=" bg-gray-100 pt-12">
        <p className="relative pl-4 text-xs font-poppins w-full bg-gray-100">
          © 2023 ARZU. ALL RIGHTS RESERVED
        </p>
      </div>
    </footer>
  );
}

export default Footer;
