import * as z from 'zod';

const MAX_FILE_SIZE = 800000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const ProductValidation = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be more than 3 chars' })
    .max(30),
  code: z.string().min(3).max(30),
  description: z.string().optional(),
  price: z.string().nonempty({ message: 'Price is required' }),
  category: z.string().optional(),
  stock: z.string().optional(),
});

export const validateThumbnail = (file: File | null) => {
  if (!file) {
    return 'Image is required';
  }

  if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
    return 'Invalid image type. Please select a JPG, JPEG, or PNG file.';
  }

  if (file.size > 8 * 1024 * 1024) {
    return 'Image size exceeds the maximum limit (8MB).';
  }

  return ''; // No error
};

export const validateFiles = (file: File[] | null) => {
  if (!file) return null;
  if (file.length > 3) {
    return 'Maximum 3 images is allowed';
  }
  if (
    !['image/jpeg', 'image/jpg', 'image/png'].includes(
      file[0].type || file[1].type || file[2].type
    )
  ) {
    return 'Invalid image type. Please select a JPG, JPEG, or PNG file.';
  }
  let fileSize = file.map((file) => file.size);
  console.log(fileSize);

  if (fileSize[0] > 8 * 1024 * 1024) {
    return 'Images size exceeds the maximum limit (8MB).';
  } else if (fileSize[1] > 8 * 1024 * 1024) {
    return 'Images size exceeds the maximum limit (8MB).';
  } else if (fileSize[2] > 8 * 1024 * 1024) {
    return 'Images size exceeds the maximum limit (8MB).';
  }

  return ''; // No error
};
