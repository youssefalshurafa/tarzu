import { getCategory } from '@/lib/actions/category.action';
import React from 'react';
import CategoryAdmin from '../../components/CategoryAdmin';

const Page = async () => {
  const response = await getCategory();
  const category = response.data;
  return (
    <main>
      <CategoryAdmin category={category} />
    </main>
  );
};

export default Page;
