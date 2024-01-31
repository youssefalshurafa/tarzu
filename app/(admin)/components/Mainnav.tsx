'use client';

import { Heart, LogIn, LogOut, Menu, ShoppingBag, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { UserInfo } from '@/lib/Types';
import { Button } from '@/components/ui/button';

const Mainnav = () => {
  const router = useRouter();

  return (
    <nav className="flex w-full  justify-between px-6 py-3 bg-slate-50 drop-shadow-md">
      <div className=" mx-auto">
        <h1
          onClick={() => router.push('/')}
          className="text-2xl font-semibold cursor-pointer"
        >
          Arzu
        </h1>
      </div>

      <div className="flex gap-4 absolute right-5">
        <div className="flex gap-2 cursor-pointer">
          <LogIn />
          <p className="font-semibold text-blue-500 underline"> Sign-in</p>
        </div>

        <Heart className=" hover: cursor-pointer" />
        <ShoppingBag />
      </div>

      <div className="flex items-center gap-3 md:gap-8">
        <div className="flex gap-4 items-center">
          <Button onClick={() => router.push('/admin')} size={'sm'}>
            Admin
          </Button>

          <div className="flex gap-2 cursor-pointer">
            <LogOut />
            <p className="font-semibold text-blue-500 underline"> Sign-out</p>
          </div>

          <User
            // onClick={() => router.push(`/profile/${userInfo.id}`)}
            className=" hover: cursor-pointer"
          />
        </div>
      </div>
    </nav>
  );
};

export default Mainnav;
