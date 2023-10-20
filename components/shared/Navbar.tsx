import React from 'react';
import Mainnav from '@/components/shared/Main-nav';
import { currentUser } from '@clerk/nextjs/server';
import { UserInfo } from '@/lib/Types';
import { getUser } from '@/lib/actions/user.action';
import { getCategory } from '@/lib/actions/category.action';

const Navbar = async () => {
  const response = await getCategory();
  const category = response.data;
  console.log('response :', response);

  const user = await currentUser();
  if (!user) {
    return (
      <nav>
        <Mainnav userInfo={null} category={category} />
      </nav>
    );
  }
  const res = await JSON.parse(JSON.stringify(await getUser(user.id)));
  const userInfo: UserInfo = res.data;

  return (
    <nav>
      <Mainnav userInfo={userInfo} category={category} />
    </nav>
  );
};

export default Navbar;
