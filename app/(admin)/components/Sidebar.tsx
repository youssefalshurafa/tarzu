'use client';

import { SignOutButton, SignedIn } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, ImageIcon, Mountain, Shirt } from 'lucide-react';

function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section className="custom-scrollbar z-20 min-h-screen bg-slate-100 shadow-lg border-none sticky left-0 top-0 flex h-screen w-fit flex-col justify-between overflow-auto border-r   pb-5 pt-28 ">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        <Link
          className={` hover:bg-purple-300 hover:text-white relative flex justify-start gap-4 rounded-lg p-4`}
          href="/"
        >
          <Home />
          <p className="md:flex hidden">Home</p>
        </Link>

        <Link
          className={`${
            pathname === '/admin/create-banner' && 'bg-purple-600 text-white'
          } hover:bg-purple-300 hover:text-white relative flex justify-start gap-4 rounded-lg p-4`}
          href="/admin/banner"
        >
          <ImageIcon />
          <p className="md:flex hidden">Banner</p>
        </Link>

        <Link
          className={`${
            pathname === '/admin/category' &&
            'bg-purple-600 hover:bg-purple-600 text-white'
          } hover:bg-purple-300 hover:text-white relative flex justify-start gap-4 rounded-lg p-4`}
          href="/admin/category"
        >
          <Mountain />
          <p className="md:flex hidden">Category</p>
        </Link>
        <Link
          className={`${
            pathname === '/admin/products' &&
            'bg-purple-600 hover:bg-purple-600 text-white'
          } hover:bg-purple-300 hover:text-white relative flex justify-start gap-4 rounded-lg p-4`}
          href="/admin/products"
        >
          <Shirt />
          <p className="md:flex hidden">Products</p>
        </Link>
      </div>
      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push('/sign-in')}>
            <div className="flex cursor-pointer gap-4 p-4">
              <Image
                src="/assets/logout.svg"
                alt="logout"
                width={24}
                height={24}
              />
              <p className=" max-lg:hidden">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
}

export default Sidebar;
