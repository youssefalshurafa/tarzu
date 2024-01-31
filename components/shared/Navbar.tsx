import React from 'react';
import Mainnav from '@/components/shared/Main-nav';

import { UserInfo } from '@/lib/Types';
import { getUser } from '@/lib/actions/user.action';
import { getCategory } from '@/lib/actions/category.action';

const Navbar = async () => {
  const response = await getCategory();
  const category = response.data;

  return (
    <nav>
      <Mainnav category={category} />
    </nav>
  );
};

export default Navbar;
