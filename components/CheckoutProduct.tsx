import { ProductType } from '@/lib/Types';
import { DeleteIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface Props {
  product: ProductType;
}
const CheckoutProduct: React.FC<Props> = ({ product }) => {
  return (
    <div className=" grid grid-cols-3 md:grid md:grid-cols-6 w-full  border-b">
      <div className=" col-span-1 md:col-span-1 p-1  mx-auto">
        <Link href={`/product/${product.title}`}>
          <img
            width={100}
            height={100}
            src={product?.thumbnail?.imgUrl}
            alt=""
          />
        </Link>
      </div>
      <div className=" col-span-2 md:col-span-3 flex mx-2 md:mx-5  justify-between items-center">
        <div className="md:flex md:space-x-8 font-poppins">
          <p>{product.title}</p>
          <p>LE {product.price}</p>
          <p>Size: {product.size}</p>
        </div>
        <div className="flex space-x-3 items-center">
          <div className="mr-2 cursor-pointer">
            <DeleteIcon />
          </div>
          <div className=" flex space-x-3 font-poppins border p-2 shadow-md">
            <span className=" cursor-pointer">-</span>
            <p className=" cursor-default">{product.quantity}</p>
            <span className=" cursor-pointer">+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProduct;
