import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductType } from '@/lib/Types';
import Image from "next/legacy/image";
import React from 'react';

const ProductCard = ({
  title,
  code,
  description,
  price,
  category,
  stock,
  thumbnail,
  images,
}: ProductType) => {
  return (
    <main className="w-full flex flex-col h-full">
      <div className="h-full items-center">
        {thumbnail ? (
          <Image
            src={thumbnail.imgUrl}
            alt="thumbnail"
            width={240}
            height={300}
          />
        ) : (
          ''
        )}
      </div>
      <div>
        <p>{code}</p>
      </div>
      <div className="flex">
        <Button size="icon">Edit</Button>
        <Button variant="destructive">Delete</Button>
      </div>
    </main>
  );
};

export default ProductCard;
