import { UserInfo } from '@/lib/Types';
import { getUser } from '@/lib/actions/user.action';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';

async function AdminPage() {
  const user = await currentUser();
  if (!user) return null;
  const userInfo: UserInfo = await JSON.parse(
    JSON.stringify(await getUser(user.id))
  );
  if (!userInfo.data?.roles.Admin || !userInfo.data.roles.Editor) redirect('/');

  return <div>page</div>;
}

export default AdminPage;
