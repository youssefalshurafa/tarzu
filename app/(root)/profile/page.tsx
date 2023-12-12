import AccountProfile from '@/components/forms/AccountProfile';
import { getUser } from '@/lib/actions/user.action';
import { currentUser } from '@clerk/nextjs';
import { ArrowBigLeft } from 'lucide-react';
import Link from 'next/link';

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await getUser(user?.id);

  const userData = {
    id: user.id,
    name: userInfo ? userInfo.data?.name : '',
    phoneNumber: userInfo ? userInfo.data?.phoneNumber : '',
    address: userInfo ? userInfo.data?.address : '',
    email: user?.emailAddresses.map((email) => email.emailAddress).toString(),
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <Link href={'/'}>
        <button className=" flex items-center border border-solid font-poppins border-neutral-700 mb-6 px-2 hover:bg-neutral-700 hover:text-white">
          <span className=" pt-1 px-1">
            <ArrowBigLeft size={24} />
          </span>{' '}
          CONTINUE SHOPPING
        </button>
      </Link>
      <h1 className="text-3xl font-bold">Profile Page</h1>
      <p className="mt-3 text-base">
        Complete your profile to be able to order
      </p>
      <section className="mt-9 p-10 bg-slate-50">
        <AccountProfile user={userData} btnTitle="Update" />
      </section>
    </main>
  );
};

export default Page;
