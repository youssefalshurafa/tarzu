import { getBanner } from '@/lib/actions/banner.action';
import AdminBanner from '../../components/AdminBanner';

const Page = async () => {
  const res = await getBanner();
  const data = res.data;
  const [banner] = data;
  console.log('banner: ', banner);
  return (
    <>
      <AdminBanner banner={banner} />
    </>
  );
};

export default Page;
