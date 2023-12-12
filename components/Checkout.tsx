'use client';
import CheckoutProduct from '@/components/CheckoutProduct';
import CheckoutWizard from '@/components/CheckoutWizard';
import Header from '@/components/shared/Header';
import { UserInfo } from '@/lib/Types';
import { useCartContext } from '@/lib/context/cartContext';
import { ArrowBigLeft, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import AccountProfile from '@/components/forms/AccountProfile';
import { useRouter } from 'next/navigation';

interface Props {
  userData: UserInfo;
}
const Checkout: React.FC<Props> = ({ userData }) => {
  const router = useRouter();
  const onNext = () => {
    router.push('/orderComplete');
  };
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
      <CheckoutWizard activeStep={1} />
      <section className="mt-9 p-10 bg-slate-50">
        <AccountProfile user={userData} btnTitle="Next" fn={onNext} />
      </section>
    </main>
  );
};

export default Checkout;
