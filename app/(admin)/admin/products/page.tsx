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
import { useEffect, useState } from 'react';

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
import { getAllProducts } from '@/lib/actions/products.action';
import ProductCard from '../../components/ProductCard';
import Image from 'next/image';
import { Trash, Edit } from 'lucide-react';
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
  console.log(products);

  const form = useForm({
    resolver: zodResolver(ProductValidation),
  });

  const onSubmit = async (values: z.infer<typeof ProductValidation>) => {
    try {
      setIsLoading(true);
      if (values.title && values.code && values.price && values.category) {
        // await createProduct({
        //   title: values.title,
        //   code: values.code,
        //   price: values.price,
        //   stock: values.stock,
        //   category: values.category,
        //   thumbnail: thumbnail,
        //   images: images,
        //   description: values.description,
        // });
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        className="bg-purple-700 mb-6"
        onClick={() => setIsFormActive(!isFormActive)}
      >
        Create a new product
      </Button>
      {isFormActive && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col justify-start gap-2"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3 w-full">
                  <FormLabel className=" font-semibold">Title</FormLabel>
                  <FormControl>
                    <Input type="text" className="border no-focus" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3 w-full">
                  <FormLabel className=" font-semibold">Code</FormLabel>
                  <FormControl>
                    <Input
                      type="string"
                      className="border no-focus"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3 w-full">
                  <FormLabel className=" font-semibold">Price</FormLabel>
                  <FormControl>
                    <Input
                      type="string"
                      className="border no-focus"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3 w-full">
                  <FormLabel className=" font-semibold">Category</FormLabel>

                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>
                          {categories.map((cat: any) => (
                            <SelectItem key={cat._id} value={cat._id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3 w-full">
                  <FormLabel className=" font-semibold">Stock</FormLabel>
                  <FormControl>
                    <Input type="text" className="border no-focus" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3 w-full">
                  <FormLabel className=" font-semibold">Thumbnail</FormLabel>
                  <FormControl>
                    <Button>upload</Button>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3 w-full">
                  <FormLabel className=" font-semibold">Images</FormLabel>
                  <FormControl>
                    <Button>upload</Button>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3 w-full">
                  <FormLabel className=" font-semibold">Description</FormLabel>
                  <FormControl>
                    <Textarea rows={3} className="border no-focus" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className=" bg-purple-700">
              {isLoading ? 'Loading...' : 'Create'}
            </Button>
          </form>
        </Form>
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
