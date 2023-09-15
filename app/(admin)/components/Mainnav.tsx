'use client';

import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';
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

interface Props {
  userInfo: UserInfo;
}

const Mainnav = ({ userInfo }: Props) => {
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

      <SignedOut>
        <div className="flex gap-4 absolute right-5">
          <SignInButton>
            <div className="flex gap-2 cursor-pointer">
              <LogIn />
              <p className="font-semibold text-blue-500 underline"> Sign-in</p>
            </div>
          </SignInButton>
          <Heart className=" hover: cursor-pointer" />
          <ShoppingBag />
        </div>
      </SignedOut>
      <div className="flex items-center gap-3 md:gap-8">
        <SignedIn>
          <div className="flex gap-4 items-center">
            {userInfo.data?.roles.Admin || userInfo.data?.roles.Editor ? (
              <Button onClick={() => router.push('/admin')} size={'sm'}>
                Admin
              </Button>
            ) : (
              <></>
            )}
            <SignOutButton>
              <div className="flex gap-2 cursor-pointer">
                <LogOut />
                <p className="font-semibold text-blue-500 underline">
                  {' '}
                  Sign-out
                </p>
              </div>
            </SignOutButton>
            <User
              onClick={() => router.push(`/profile/${userInfo.id}`)}
              className=" hover: cursor-pointer"
            />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Mainnav;
