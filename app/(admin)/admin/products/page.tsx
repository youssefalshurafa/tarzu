'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ProductValidation } from '@/lib/validations/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormEvent, useEffect, useState } from 'react';

import { ProductType, Res, Thumbnail } from '@/lib/Types';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getCategory } from '@/lib/actions/category.action';
import { createProduct, getAllProducts } from '@/lib/actions/products.action';
import { toast, Toaster } from 'react-hot-toast';
import Image from 'next/image';
import { Trash, Edit } from 'lucide-react';
import { uploadFiles, uploadThumbnail } from '@/lib/actions/files.action';
import { utapi } from 'uploadthing/server';
const Page = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isFormActive, setIsFormActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAllCategories = async () => {
    const response = await getCategory();
    setCategories(response.data);
  };
  const getProducts = async () => {
    const response = await getAllProducts();
    setProducts(response.data);
  };

  useEffect(() => {
    getAllCategories();
    getProducts();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ProductValidation),
  });

  const onSubmit = async (data: any) => {
    console.log(data);
  };
  // const onSubmit = async (
  //   e: FormEvent<HTMLFormElement>,
  //   values: z.infer<typeof ProductValidation>
  // ) => {
  //   try {
  //     toast.loading('Updating...');
  //     setIsLoading(true);
  //     const fd = new FormData(e.target as HTMLFormElement);
  //     const uploadedImages = await uploadFiles(fd);
  //     const key = uploadedImages.map((img) => img.data?.url).toString();
  //     const url = uploadedImages.map((img) => img.data?.key).toString();
  //     const uploadedThumbnail = await uploadThumbnail(fd);
  //     const imgKey = uploadedThumbnail.map((img) => img.data?.url).toString();
  //     const imgUrl = uploadedThumbnail.map((img) => img.data?.key).toString();
  //     console.log(values);

  //     if (values.title && values.code && values.price && values.category) {
  //       const newProduct = {
  //         title: values.title,
  //         code: values.code,
  //         price: values.price,
  //         stock: values.stock,
  //         category: values.category,
  //         thumbnail: {
  //           imgKey,
  //           imgUrl,
  //         },
  //         images: [
  //           {
  //             key,
  //             url,
  //           },
  //         ],
  //         description: values.description,
  //       };
  //       const res = await createProduct(newProduct);
  //       if (res.success) {
  //         toast.dismiss();
  //         toast.success('Category updated!');
  //         getProducts();
  //       } else {
  //         toast.dismiss();
  //         toast.error('error');
  //       }
  //     }
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <Toaster position="top-center"></Toaster>
      <Button
        className="bg-purple-700 mb-6"
        onClick={() => setIsFormActive(!isFormActive)}
      >
        Create a new product
      </Button>
      {isFormActive && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-start gap-4"
        >
          <div className="flex flex-col gap-2 font-semibold">
            <p>Title</p>
            <Input
              type="text"
              className="border no-focus"
              {...register('title')}
            />
            {errors.title && (
              <p className="text-red-500">{`${errors.title.message}`}</p>
            )}
          </div>

          <div className="flex flex-col gap-2 font-semibold">
            <p>Code</p>
            <Input
              type="text"
              className="border no-focus"
              {...register('code')}
            />
          </div>

          <div className="flex flex-col gap-2 font-semibold">
            <p>Price</p>
            <Input
              type="text"
              className="border no-focus"
              {...register('price')}
            />
          </div>

          <div className="flex flex-col gap-2 font-semibold">
            <p>Category</p>
            <Input
              type="text"
              className="border no-focus"
              {...register('category')}
            />
          </div>

          <div className="flex flex-col gap-2 font-semibold">
            <p>Thumbnail</p>
            <Input
              type="file"
              className="border no-focus"
              {...register('thumbnail')}
            />
            {errors.thumbnail && (
              <p className="text-red-500">{`${errors.thumbnail.message}`}</p>
            )}
          </div>

          <div className="flex flex-col gap-2 font-semibold">
            <p>Images</p>
            <Input
              type="file"
              multiple
              className="border no-focus"
              {...register('files')}
            />
            {errors.files && (
              <p className="text-red-500">{`${errors.files.message}`}</p>
            )}
          </div>

          <div className="flex flex-col gap-2 font-semibold">
            <p>Description</p>
            <Textarea
              rows={3}
              className="border no-focus"
              {...register('description')}
            />
          </div>

          <Button type="submit" className=" bg-purple-700">
            {isLoading ? 'Loading...' : 'Create'}
          </Button>
        </form>
      )}
      <h2 className="font-bold text-3xl mb-6">Current products</h2>
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 items-center ">
        {products.map((product: ProductType) => (
          <section className="w-full flex flex-col h-full">
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
            </div>
            <div className="flex gap-4 w-max">
              <Edit size={24} />

              <Trash size={24} />
            </div>
          </section>
        ))}
      </div>
    </>
  );
};

export default Page;
