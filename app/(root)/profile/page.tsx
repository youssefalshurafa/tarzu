import AccountProfile from '@/components/forms/AccountProfile';
import { getUser } from '@/lib/actions/user.action';

import React from 'react';

const Page = async () => {
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="text-3xl font-bold">Profile Page</h1>
    </main>
  );
};

export default Page;
