import Checkout from '@/components/Checkout';
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
    <div>
      <Checkout userData={userData} />
    </div>
  );
};

export default Page;
