'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserValidation } from '@/lib/validations/user';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import * as z from 'zod';
import { usePathname } from 'next/navigation';
import { createUser, updateUser } from '@/lib/actions/user.action';
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { UserInfo } from '@/lib/Types';

interface Props {
  user: UserInfo;
  btnTitle: string;
  fn?: () => void;
}

const AccountProfile = ({ user, btnTitle, fn }: Props) => {
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log('user: ', user);

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      name: user?.name || '',
      address: user?.address || '',
      phoneNumber: user?.phoneNumber || '',
      email: user?.email || '',
    },
  });

  const onCreate = async (values: z.infer<typeof UserValidation>) => {
    try {
      setIsLoading(true);
      const formData = {
        userId: user?.id,
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        address: values.address,
      };

      await createUser(formData);
      toast.success('Profile Created!');
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const onUpdate = async (values: z.infer<typeof UserValidation>) => {
    try {
      setIsLoading(true);
      const formData = {
        userId: user?.id,
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        address: values.address,
      };
      await updateUser(formData);
      toast.success('Profile Updated!');
      setIsLoading(false);
      if (fn) {
        fn();
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (pathname.includes('/profile') || pathname.includes('/checkout')) {
    return (
      <Form {...form}>
        <Toaster position="top-center"></Toaster>
        <form
          onSubmit={form.handleSubmit(onUpdate)}
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
            {isLoading ? 'Loading...' : btnTitle}
          </Button>
        </form>
      </Form>
    );
  } else if (pathname.includes('/onboarding')) {
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onCreate)}
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
            {isLoading ? 'Loading...' : btnTitle}
          </Button>
        </form>
      </Form>
    );
  }
};

export default AccountProfile;
