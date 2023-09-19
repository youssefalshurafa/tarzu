import * as z from 'zod';

const MAX_FILE_SIZE = 800000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const ProductValidation = z.object({
  title: z.string().min(3).max(30).optional(),
  code: z.string(),
  description: z.string().min(3).max(300).optional(),
  price: z.string(),
  category: z.string(),
  stock: z.string().optional(),
  thumbnail: z
    .any()
    .refine((files) => files?.length == 1, 'Image is required.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 8MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
});
