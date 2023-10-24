'use client';

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
import { useState } from 'react';
import EditProductForm from './EditProductForm';

interface Props {
  categories: Category[];
}
const CurrentProducts: React.FC<Props> = ({ categories }) => {
  const [editActive, setEditActive] = useState<any>('');
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
        location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    console.log('clicked');

    setEditActive('');
  };
  console.log(categories);

  return (
    <>
      <Toaster position="top-center"></Toaster>

      <h2 className="font-bold text-3xl mb-6">Current products</h2>
      <div className=" flex flex-col w-full gap-2 ">
        {categories?.map((category) => (
          <Accordion type="single" collapsible key={category._id}>
            <AccordionItem value="item-1">
              <AccordionTrigger>{category.name}</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2">
                  {category.products?.map((product) => (
                    <div>
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
                        <div className="flex">
                          <p>{product.code}</p>
                        </div>
                        <div className="flex gap-4 w-max">
                          <Edit
                            onClick={() => setEditActive(product._id)}
                            size={24}
                          />
                          <Trash
                            onClick={() => handleDelete(product)}
                            size={24}
                          />
                        </div>
                        {editActive === product._id && (
                          <div className="absolute">
                            <div className="relative -left-5 top-5 rounded-md border shadow-md backdrop-blur-lg p-4 ">
                              <EditProductForm
                                handleCancel={handleCancel}
                                categories={categories}
                                product={product}
                              />
                            </div>
                          </div>
                        )}
                      </section>
                    </div>
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
