import * as z from 'zod';

export const UserValidation = z.object({
  name: z.string().min(3).max(30),
  phoneNumber: z.string().min(3).max(30),
  email: z.string().email({ message: 'invalid email address' }),
  address: z.string().min(10).max(300),
});
