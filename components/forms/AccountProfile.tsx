'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { UserValidation } from '@/lib/validations/user';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import * as z from 'zod';
import { usePathname, useRouter } from 'next/navigation';
import { createUser, updateUser } from '@/lib/actions/user.action';

interface Props {
  user: {
    id: string;
    name: string;
    phoneNumber: string;
    address: string;
    email: string;
  };
  btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      name: user?.name || '',
      address: user?.address || '',
      phoneNumber: user?.phoneNumber || '',
      email: user?.email || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    try {
      const formData = {
        userId: user?.id,
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        address: values.address,
      };
      console.log('formdata: ', formData);

      await createUser(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className=" font-semibold">Name</FormLabel>
              <FormControl>
                <Input type="text" className="border no-focus" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className=" font-semibold">E-mail</FormLabel>
              <FormControl>
                <Input type="text" className="border no-focus" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className=" font-semibold">Phone Number</FormLabel>
              <FormControl>
                <Input type="text" className="border no-focus" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className=" font-semibold">Address</FormLabel>
              <FormControl>
                <Textarea rows={10} className="border no-focus" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className=" bg-purple-700">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
