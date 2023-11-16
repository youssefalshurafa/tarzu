'use client';
import CheckoutProduct from '@/components/CheckoutProduct';
import CheckoutWizard from '@/components/CheckoutWizard';
import Header from '@/components/shared/Header';
import { useCartContext } from '@/lib/context/cartContext';
import { ArrowBigLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Page = () => {
  const { cart } = useCartContext();

  return (
    <main className="absolute  top-16 p-4 w-full flex flex-col justify-between">
      <Header />
      <Link href={'/'}>
        <button className=" flex items-center border border-solid font-poppins border-neutral-700 mb-6 px-2 hover:bg-neutral-700 hover:text-white">
          <span className=" pt-1 px-1">
            <ArrowBigLeft size={24} />
          </span>{' '}
          CONTINUE SHOPPING
        </button>
      </Link>
      <div>
        <CheckoutWizard activeStep={0} />
      </div>
      <div className="md:col-span-3">
        {cart.map((product, i) => (
          <div key={i}>
            <CheckoutProduct product={product} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Page;
