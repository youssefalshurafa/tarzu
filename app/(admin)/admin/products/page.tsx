import { getCategory } from '@/lib/actions/category.action';
import CurrentProducts from '../../components/CurrentProducts';
import CreateProductForm from '../../components/CreateProductForm';
import { ProductProvider } from '@/lib/context/productContext';

const Page = async () => {
  const categories = await getCategory();
  if (!categories) return null;
  return (
    <>
      <ProductProvider>
        <CreateProductForm categories={categories.data} />
        <CurrentProducts />
      </ProductProvider>
    </>
  );
};

export default Page;
