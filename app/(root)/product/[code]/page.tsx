'use client';

import { Button } from '@/components/ui/button';
import { ProductType } from '@/lib/Types';
import { getByCode } from '@/lib/actions/products.action';
import { useCartContext } from '@/lib/context/cartContext';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Page = () => {
  const { cartItems, addToCart } = useCartContext();
  const params = useParams();
  const { code } = params;
  const router = useRouter();
  const [product, setProduct] = useState<ProductType>();
  const [size, setSize] = useState('');

  const getProduct = async () => {
    const res = await getByCode(code);
    setProduct(res.data);
  };
  console.log('cartItems: ', cartItems);

  useEffect(() => {
    getProduct();
  }, []);

  const updatedProduct = { ...product, size };

  const imagesArray = product?.images.map((image) => image.url);
  const thumbnail = product?.thumbnail?.imgUrl;
  const images = [thumbnail].concat(imagesArray);
  return (
    <div className="mt-8 p-5 w-full">
      <Toaster position="top-center"></Toaster>
      <div
        onClick={() => router.push('/')}
        className="mb-4 cursor-pointer flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text tracking-widest"
      >
        <h1 className=" text-7xl  ">ARZU</h1>
        <p>FOR ALL WOMEN</p>
      </div>
      <div className=" bg-green-300 h-8 my-4 text-center items-center font-semibold">
        <p className=" p-1 "> FREE SHIPPING FOR OVER 1500 LE</p>
      </div>
      <div className="flex flex-col mt-3 justify-between">
        <div className="relative  top-8 pb-7 md:grid grid-cols-2  container mx-auto">
          <div>
            <Carousel>
              {images?.map((image, i) => (
                <div key={i}>
                  <img src={image} alt="image" />
                </div>
              ))}
            </Carousel>
          </div>

          <div className=" font-poppins  p-5 flex flex-col ">
            <p className="text-2xl "> {product?.title}</p>
            <p className="text-lg "> EGP {product?.price}</p>
            <p className="pt-2 text-lg">{`Size: ${size}`}</p>
            <div className="flex w-full  space-x-4  pt-2">
              <button
                onClick={() => setSize('1')}
                className={
                  size == '1'
                    ? 'bg-gray-800 text-white w-12 h-5 rounded-md'
                    : 'bg-gray-200 w-12 h-5 rounded-md hover:bg-gray-800 hover:text-white'
                }
              >
                1
              </button>
              <button
                onClick={() => setSize('2')}
                className={
                  size == '2'
                    ? 'bg-gray-800 text-white w-12 h-5 rounded-md'
                    : 'bg-gray-200 w-12 h-5 rounded-md hover:bg-gray-800 hover:text-white'
                }
              >
                2
              </button>
            </div>
            <p className="pt-4 text-base font-extralight font-sans">
              Size 1 : from 70KG to 100KG
            </p>
            <p className="pt-2 text-base  font-extralight font-sans">
              Size 2 : from 100KG to 120KG
            </p>
            <div className="mt-5 flex  items-center gap-4">
              <p className=" font-serif">Material</p>
              <p className="font-xs font-extralight font-sans">
                {product?.material}
              </p>
            </div>
            {product?.description && (
              <div className="mt-5">
                <p className=" font-serif">Description</p>
                <p className="pt-4 font-xs font-extralight font-sans">
                  {product?.description}
                </p>
              </div>
            )}
            <div>
              <button
                onClick={() => {
                  addToCart(updatedProduct);
                  toast.success(`${updatedProduct.code} added to cart`);
                }}
                className=" text-center w-full hover:bg-gray-200 hover:text-black  h-8 bg-neutral-700 text-white mt-4 rounded-sm disabled:bg-gray-400 px-2 disabled:text-white disabled:cursor-not-allowed"
                disabled={!size ? true : false}
              >
                ADD TO BAG
              </button>
            </div>

            <div className="mt-5">
              <Button
                onClick={() => router.back()}
                className="bg-neutral-700 text-white hover:bg-gray-200 hover:text-black h-8 w-full cursor-pointer"
              >
                Back To Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
