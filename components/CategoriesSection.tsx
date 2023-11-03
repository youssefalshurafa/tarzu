import { Category } from '@/lib/Types';
import Image from 'next/image';
import React from 'react';

interface Props {
  categories: Category[];
}
const CategoriesSection: React.FC<Props> = ({ categories }) => {
  return (
    <>
      <div className="w-full grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4  ">
        {categories.map((category) => (
          <div className="relative  overflow-hidden  ">
            <Image
              width={240}
              height={300}
              className="h-full w-full"
              src={category.image.url}
              alt="category image"
            />
            <p className="absolute top-2 left-2   font-poppins font-semibold text-lg">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoriesSection;
