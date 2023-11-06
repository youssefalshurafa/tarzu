'use client';
import ProductCard from '@/components/ProductCard';
import { Category } from '@/lib/Types';
import { getCategoryById } from '@/lib/actions/category.action';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
  const [category, setCategory] = useState<Category>();
  const params = useParams();
  const { name } = params;
  const router = useRouter();
  const getCategory = async () => {
    const res = await getCategoryById(name);
    setCategory(res?.data);
  };
  useEffect(() => {
    getCategory();
  }, []);
  console.log('category:', category);

  return (
    <main className="absolute top-16 p-4 font-poppins w-full">
      <div
        onClick={() => router.push('/')}
        className="mb-4 cursor-pointer flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text tracking-widest"
      >
        <h1 className=" text-7xl  ">ARZU</h1>
        <p>FOR ALL WOMEN</p>
      </div>
      <div className="flex flex-col w-full items-center justify-center ">
        <p className="text-2xl">{category?.name.toUpperCase()}</p>
        <p>{category?.products.length} STYLES FOUND</p>
      </div>
      {category?.products && (
        <div>
          <ProductCard products={category?.products} />
        </div>
      )}
    </main>
  );
};

export default Page;
