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
import { Button } from '@/components/ui/button';

type category = {
  id: Number;
  name: String;
};
interface Props {
  category: category[];
}

const Mainnav = ({ category }: Props) => {
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
        {category.map((category, i) => (
          <p key={i} className=" hover:cursor-pointer">
            {category.name}
          </p>
        ))}
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
            onClick={() => router.push(`/profile`)}
            className=" hover: cursor-pointer"
          />
          <Heart className=" hover: cursor-pointer" />
          <ShoppingBag className=" hover: cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};

export default Mainnav;
