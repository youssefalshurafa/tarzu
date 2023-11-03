import Banner from '@/components/Banner';
import CategoriesSection from '@/components/CategoriesSection';
import { getBanner } from '@/lib/actions/banner.action';
import { getCategory } from '@/lib/actions/category.action';

export default async function Home() {
  const response = await getBanner();
  const banner = response.data.map((item: any) => item.imgUrl).toString();
  const categories = await getCategory();

  return (
    <main>
      <Banner banner={banner} />
      <CategoriesSection categories={categories.data} />
    </main>
  );
}
