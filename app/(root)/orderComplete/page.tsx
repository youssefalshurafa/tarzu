import OrderComplete from '@/components/OrderComplete';
import { getUser } from '@/lib/actions/user.action';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const Page = async () => {
  const user = await currentUser();
  if (!user) return redirect('/sign-in');

  const userInfo = await getUser(user?.id);

  const userData = {
    id: user.id,
    name: userInfo ? userInfo.data?.name : '',
    phoneNumber: userInfo ? userInfo.data?.phoneNumber : '',
    address: userInfo ? userInfo.data?.address : '',
    email: user?.emailAddresses.map((email) => email.emailAddress).toString(),
  };
  return (
    <main>
      <OrderComplete userData={userData} />
    </main>
  );
};

export default Page;
