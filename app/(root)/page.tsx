import Banner from '@/components/Banner';
import { getBanner } from '@/lib/actions/banner.action';

export default async function Home() {
  const response = await getBanner();
  const banner = response.data.map((item: any) => item.imgUrl).toString();

  return (
    <main>
      <Banner banner={banner} />
    </main>
  );
}
