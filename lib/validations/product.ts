import * as z from 'zod';

export const ProductValidation = z.object({
  title: z.string().min(3).max(30).optional(),
  code: z.string().optional(),
  description: z.string().min(3).max(300).optional(),
  price: z.string().optional(),
  category: z.string().optional(),
  stock: z.string().optional(),
  thumbnail: z.string().url().optional(),
  images: z.array(z.string().url()).optional(),
});
