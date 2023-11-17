'use client';

import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';
import {
  Heart,
  Home,
  LogIn,
  LogOut,
  Menu,
  ShoppingBag,
  User,
} from 'lucide-react';
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
import { useCartContext } from '@/lib/context/cartContext';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import Link from 'next/link';
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
  const { cartItems, setCartItems } = useCartContext();
  //@ts-ignore
  useEffect(() => {
    const getCookie = Cookies.get('cart');
    if (getCookie?.length) {
      //@ts-ignore
      console.log('getCookie:', getCookie);
      setCartItems(JSON.parse(getCookie));
    }
  }, []);

  return (
    <nav className="flex  px-6 py-3 bg-slate-50 drop-shadow-md items-center ">
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Menu />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-2 h-full w-screen">
            <DropdownMenuLabel className=" mx-auto text-center text-2xl  font-poppins">
              Menu
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {category.map((category, i) => (
              <DropdownMenuItem
                key={i}
                className=" justify-center text-lg font-poppins cursor-pointer"
                onClick={() => router.push(`/category/${category.name}`)}
              >
                {category.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="hidden mx-auto md:flex gap-4 font-semibold items-center">
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

      <SignedIn>
        <div className="flex gap-4 items-center mx-auto">
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
              <p className="font-semibold text-blue-500 underline"> Sign-out</p>
            </div>
          </SignOutButton>
          <User
            onClick={() => router.push(`/profile`)}
            className=" hover: cursor-pointer"
          />
          <Heart className=" hover: cursor-pointer" />
          <Link href={'/cart'}>
            <ShoppingBag className=" hover: cursor-pointer" />
          </Link>

          <div className="w-6 h-6 text-center  bg-neutral-700 text-white rounded-full relative right-4 bottom-1 z-20">
            <span className="text-xs font-bold">{cartItems.length}</span>
          </div>
        </div>
      </SignedIn>
    </nav>
  );
};

export default Mainnav;
