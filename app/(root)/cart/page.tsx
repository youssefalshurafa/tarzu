'use client';
import CheckoutProduct from '@/components/CheckoutProduct';
import CheckoutWizard from '@/components/CheckoutWizard';
import Header from '@/components/shared/Header';
import { useCartContext } from '@/lib/context/cartContext';
import { ArrowBigLeft, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

const Page = () => {
  const { cartItems, clearCart } = useCartContext();
  const [shippingRate, setShippingRate] = useState(0);

  const priceTotal = cartItems?.map((item) => item.price * item.quantity);
  const sum = priceTotal.reduce((accumulator, currentNumber) => {
    return accumulator + currentNumber;
  }, 0);
  useEffect(() => {
    sum > 1500 ? setShippingRate(0) : setShippingRate(45);
  });
  return (
    <main className="mt-7 p-4 w-full flex flex-col justify-between">
      <Toaster position="top-center"></Toaster>
      <Header />
      <Link href={'/'}>
        <button className=" flex items-center border border-solid font-poppins border-neutral-700 mb-6 px-2 hover:bg-neutral-700 hover:text-white">
          <span className=" pt-1 px-1">
            <ArrowBigLeft size={24} />
          </span>{' '}
          CONTINUE SHOPPING
        </button>
      </Link>
      <div className="relative">
        <div
          onClick={() => {
            clearCart();
            toast.success('Cart Empty');
          }}
          className="flex absolute right-2 -top-14 cursor-pointer gap-4 hover:bg-neutral-700 hover:text-white p-1 px-2 rounded-md"
        >
          <Trash2 />
          <p>Empty cart</p>
        </div>
        <CheckoutWizard activeStep={0} />
      </div>
      <div className="md:col-span-3">
        {cartItems?.map((product, i) => (
          <div className="  w-full items-center" key={i}>
            <CheckoutProduct product={product} />
          </div>
        ))}
      </div>
      <div className=" mb-8">
        {cartItems.length > 0 ? (
          <div className=" max-w-md md:max-w-4xl mx-auto bg-gray-100 mt-4 font-poppins">
            <p className=" font-serif text-center pt-4 text-lg">
              ORDER SUMMARY
            </p>

            <div className="flex justify-between mx-4 pt-4 pb-4">
              <p>Subtotal</p>
              <p>LE {sum}</p>
            </div>

            {shippingRate > 0 ? (
              <div className="flex justify-between mx-4 py-4">
                <p>Shipping</p>
                <p>LE {shippingRate}</p>
              </div>
            ) : shippingRate <= 0 ? (
              <div className=" mx-4 py-4">
                <p>Your Order qualifies for free shipping!</p>
              </div>
            ) : (
              <></>
            )}

            <div className="py-4 flex justify-between mx-4">
              <p>Total</p>
              <p>LE {sum + shippingRate}</p>
            </div>
            <div className=" text-center pb-4">
              <Link href={'/checkout'}>
                <button className="  border border-solid font-poppins border-neutral-700 px-2 bg-neutral-700 text-white hover:bg-white hover:text-neutral-700">
                  Proceed To Checkout
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="pl-8 font-poppins text-lg">
            <h1>Your Bag is Empty...</h1>
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;
