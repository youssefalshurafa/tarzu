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

type category = {
  id: Number;
  name: String;
};
interface Props {
  category: category[];
  userInfo: UserInfo | null;
}

const Mainnav = ({ category, userInfo }: Props) => {
  const router = useRouter();

  return (
    <nav className="flex justify-between px-6 py-3 bg-slate-50 drop-shadow-md">
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Menu />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-2 h-full w-screen">
            <DropdownMenuLabel className=" mx-auto text-center text-2xl font-semibold">
              Menu
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {category.map((category, i) => (
              <DropdownMenuItem
                key={i}
                className=" justify-center text-lg font-semibold cursor-pointer"
                onClick={() => router.push(`/category/${category.name}`)}
              >
                {category.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <h1
          onClick={() => router.push('/')}
          className="text-2xl font-semibold cursor-pointer"
        >
          Arzu
        </h1>
      </div>
      <div className="hidden md:flex gap-4 font-semibold items-center">
        {category?.map((category, i) => (
          <p key={i} className=" hover:cursor-pointer">
            {category.name}
          </p>
        ))}
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
            {userInfo?.roles.Admin || userInfo?.roles.Editor ? (
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
              onClick={() => router.push(`/profile`)}
              className=" hover: cursor-pointer"
            />
            <Heart className=" hover: cursor-pointer" />
            <ShoppingBag className=" hover: cursor-pointer" />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Mainnav;
