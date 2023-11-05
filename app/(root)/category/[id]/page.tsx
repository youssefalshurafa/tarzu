'use client';
import { Category } from '@/lib/Types';
import { getCategoryById } from '@/lib/actions/category.action';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
  const [category, setCategory] = useState<Category>();
  const params = useParams();
  const { id } = params;

  const getCategory = async () => {
    const res = await getCategoryById(id);
    setCategory(res?.data);
  };
  useEffect(() => {
    getCategory();
  }, []);
  console.log('category:', category);

  return (
    <>
      <div>
        <p>{category?.name}</p>
      </div>
    </>
  );
};

export default Page;
