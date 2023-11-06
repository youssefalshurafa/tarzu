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
      <div className="mt-14 mb-2 flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text tracking-widest">
        <h1 className=" text-7xl font-bold ">ARZU</h1>
        <p>FOR ALL WOMEN</p>
      </div>
      <Banner banner={banner} />
      <CategoriesSection categories={categories.data} />
    </main>
  );
}
