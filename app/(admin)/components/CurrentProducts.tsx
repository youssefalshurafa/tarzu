import { Category, ProductType } from '@/lib/Types';
import Image from 'next/image';
import { Trash, Edit } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { toast, Toaster } from 'react-hot-toast';
import { deleteFiles } from '@/lib/actions/files.action';
import { deleteProduct } from '@/lib/actions/products.action';
import { useEffect } from 'react';

const CurrentProducts = ({ categories, reloadFlag }: any) => {
  useEffect(() => {
    console.log(reloadFlag);
  }, [reloadFlag]);

  const handleDelete = async (product: ProductType) => {
    try {
      toast.loading('Deleting...');
      if (product.images.length) {
        const oldImgKeys = product.images.map((product) => product.key);
        let keys = oldImgKeys.toString();
        let finalKeys = keys.split(',');
        await deleteFiles(finalKeys);
        await deleteFiles(product.thumbnail?.imgKey);
        await deleteProduct(product._id);

        toast.dismiss();
        toast.success(`Deleted Product code ${product.code}`);
      } else {
        await deleteProduct(product._id);
        await deleteFiles(product.thumbnail?.imgKey);
        toast.dismiss();
        toast.success(`Deleted Product code ${product.code}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Toaster position="top-center"></Toaster>
      <h2 className="font-bold text-3xl mb-6">Current products</h2>
      <div className=" flex flex-col w-full gap-2 ">
        {categories?.map((category: Category) => (
          <Accordion type="single" collapsible key={category._id}>
            <AccordionItem value="item-1">
              <AccordionTrigger>{category.name}</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2">
                  {category.products?.map((product: ProductType) => (
                    <section
                      key={product._id}
                      className="w-full flex flex-col h-full"
                    >
                      <div className="h-full items-center">
                        {product.thumbnail ? (
                          <Image
                            src={product.thumbnail.imgUrl}
                            alt="thumbnail"
                            width={240}
                            height={300}
                          />
                        ) : (
                          ''
                        )}
                      </div>
                      <div>
                        <p>{product.code}</p>
                        {/* <p>{product.category.name}</p> */}
                      </div>
                      <div className="flex gap-4 w-max">
                        <Edit size={24} />

                        <Trash
                          onClick={() => handleDelete(product)}
                          size={24}
                        />
                      </div>
                    </section>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </>
  );
};

export default CurrentProducts;
