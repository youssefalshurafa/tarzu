import { ProductType } from '@/lib/Types';
import Image from 'next/image';
import React from 'react';

interface ProductCardProps {
  products: ProductType[];
}
const ProductCard: React.FC<ProductCardProps> = ({ products }) => {
  return (
    <div>
      <div className=" grid grid-cols-2 gap-2 h-full  items-center mt-6 p-4">
        {products.map((product) => (
          <div className="flex flex-col items-center">
            <Image
              width={440}
              height={500}
              className="h-full  rounded-md"
              src={product.thumbnail?.imgUrl || ''}
              alt="category image"
            />
            <div className="flex gap-4">
              <p className=" font-semibold text-lg">{product.title}</p>
              <p className=" font-semibold text-lg">{product.code}</p>
            </div>
            <div>
              <p className=" font-semibold text-lg">{product.price} LE</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
