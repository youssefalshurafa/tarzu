import { Category } from '@/lib/Types';
import Image from "next/legacy/image";
import Link from 'next/link';

import React from 'react';

interface Props {
  categories: Category[];
}
const CategoriesSection: React.FC<Props> = ({ categories }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 mt-4 ">
        {categories.map((category) => (
          <Link href={`/category/${category.name}`}>
            <div
              key={category._id}
              className=" flex flex-col h-full  items-center"
            >
              <Image
                width={240}
                height={300}
                className="h-full  rounded-md"
                src={category.image.url}
                alt="category image"
              />
              <p className=" font-semibold text-lg">{category.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default CategoriesSection;
