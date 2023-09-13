import React from 'react';
import Mainnav from '@/components/shared/Main-nav';
import { currentUser } from '@clerk/nextjs/server';
import { UserInfo } from '@/lib/Types';

const Navbar = async () => {
  const category = [
    { id: 1, name: 'Kids' },
    { id: 2, name: 'Tracksuits' },
    { id: 3, name: 'Tunics' },
    { id: 4, name: 'Basics' },
    { id: 5, name: 'Dresses' },
  ];

  //   const user = await currentUser();
  //   if (!user) {
  //     return (
  //       <nav>
  //         <Mainnav userInfo={null} category={category} />
  //       </nav>
  //     );
  //   }
  //   const userInfo: UserInfo = await JSON.parse(
  //     JSON.stringify(await getUser(user.id))
  //   );
  return (
    <nav>
      <Mainnav category={category} />
    </nav>
  );
};

export default Navbar;
