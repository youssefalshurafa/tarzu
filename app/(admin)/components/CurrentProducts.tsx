'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ProductType } from '@/lib/Types';
import Image from "next/legacy/image";
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
import { useEffect, useState } from 'react';
import EditProductForm from './EditProductForm';
import { useProductContext } from '@/lib/context/productContext';
import { Button } from '@/components/ui/button';

const CurrentProducts = () => {
  const [editActive, setEditActive] = useState<any>('');
  const { getCategories, categories } = useProductContext();

  useEffect(() => {
    getCategories();
  }, []);

  const handleDelete = async (product: ProductType) => {
    try {
      toast.loading('Deleting...');
      if (product.images.length) {
        const oldImgKeys = product.images.map((product) => product.key);

        await deleteFiles(oldImgKeys);
        await deleteFiles(product.thumbnail?.imgKey);
        await deleteProduct(product._id);
        await getCategories();
        toast.dismiss();
        toast.success(`Deleted Product code ${product.code}`);
      } else {
        await deleteProduct(product._id);
        await deleteFiles(product.thumbnail?.imgKey);
        await getCategories();
        toast.dismiss();
        toast.success(`Deleted Product code ${product.code}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setEditActive('');
  };

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
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {category.products?.map((product: ProductType) => (
                    <div>
                      <section
                        key={product._id}
                        className="w-full flex flex-col h-full"
                      >
                        <div className="h-full  items-center">
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
                        <div className="flex w-full ">
                          <p className="text-lg font-semibold">
                            {product.code}
                          </p>
                        </div>
                        <div className="flex gap-4 w-max ">
                          <div
                            onClick={() => setEditActive(product._id)}
                            className="flex items-center gap-1 hover:cursor-pointer"
                          >
                            <Edit size={24} />
                            <p className="font-bold">Edit</p>
                          </div>
                          <div className="flex items-center gap-1 text-red-400 hover:cursor-pointer">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                  Delete
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you sure you want to delete?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete the product.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction>
                                    <p onClick={() => handleDelete(product)}>
                                      Yes
                                    </p>
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
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
