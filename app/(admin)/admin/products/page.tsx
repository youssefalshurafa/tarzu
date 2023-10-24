import { getCategory } from '@/lib/actions/category.action';
import CurrentProducts from '../../components/CurrentProducts';
import CreateProductForm from '../../components/CreateProductForm';

const Page = async () => {
  const categories = await getCategory();

  if (!categories) return null;
  return (
    <>
      <CreateProductForm categories={categories.data} />
      <CurrentProducts categories={categories.data} />
    </>
  );
};

export default Page;
