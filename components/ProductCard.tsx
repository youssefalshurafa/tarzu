import { ProductType } from '@/lib/Types';
import Image from 'next/legacy/image';
import Link from 'next/link';
import React from 'react';

interface ProductCardProps {
  products: ProductType[];
}
const ProductCard: React.FC<ProductCardProps> = ({ products }) => {
  return (
    <div>
      <div className=" grid grid-cols-2 md:grid-cols-3 gap-2 h-full  items-center mt-6 p-4">
        {products.map((product) => (
          <div className="flex flex-col h-full items-center justify-between ">
            <div className="  relative">
              <Link href={`/product/${product.code}`}>
                <Image
                  width={300}
                  height={375}
                  className="h-full  rounded-md cursor-pointer"
                  src={product.thumbnail?.imgUrl || ''}
                  alt="category image"
                />
              </Link>

              <div className="flex gap-4 ">
                <p className="  text-basic">{product.title}</p>
                <p className="  text-basic">{product.code}</p>
              </div>
              <div>
                <p className=" font-semibold text-lg">{product.price} LE</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
