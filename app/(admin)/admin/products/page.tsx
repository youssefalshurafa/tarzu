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
        <div className="flex flex-col gap-4 ">
          <CreateProductForm categories={categories.data} />
          <CurrentProducts />
        </div>
      </ProductProvider>
    </>
  );
};

export default Page;
