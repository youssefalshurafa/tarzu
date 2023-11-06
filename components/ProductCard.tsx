import { ProductType } from '@/lib/Types';
import Image from 'next/image';
import React from 'react';

interface ProductCardProps {
  products: ProductType[];
}
const ProductCard: React.FC<ProductCardProps> = ({ products }) => {
  console.log(products);

  return (
    <div>
      <h1>products</h1>
    </div>
    //     <div

    //     className=" flex flex-col h-full  items-center"
    //   >
    //     <Image
    //       width={240}
    //       height={300}
    //       className="h-full  rounded-md"
    //       src={}
    //       alt="category image"
    //     />
    //     <p className=" font-semibold text-lg">{category.name}</p>
    //   </div>
  );
};

export default ProductCard;
