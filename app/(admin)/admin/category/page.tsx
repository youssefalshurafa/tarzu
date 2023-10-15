'use client';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import React, { FormEvent, useEffect, useState } from 'react';
import {
  deleteFiles,
  listFiles,
  uploadFiles,
} from '@/lib/actions/files.action';
import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from '@/lib/actions/category.action';
import { toast, Toaster } from 'react-hot-toast';
import Image from 'next/image';

const Page = () => {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editActive, setEditActive] = useState<any>(false);

  const getAllCategories = async () => {
    const response = await getCategory();
    setCategory(response.data);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      toast.loading('Creating...');
      const fd = new FormData(e.target as HTMLFormElement);
      const name = fd.getAll('name').toString();

      const currentCategories = category.map((item: any) => item.name);
      if (currentCategories.includes(name)) {
        toast.error('Category name already exists');
        setIsLoading(false);
        return null;
      }
      const uploadedFiles = await uploadFiles(fd);
      const url = uploadedFiles.map((img) => img.data?.url).toString();
      const key = uploadedFiles.map((img) => img.data?.key).toString();

      const formData = {
        name,
        image: {
          url,
          key,
        },
      };
      const res = await createCategory(formData);
      if (res.success) {
        toast.dismiss();
        toast.success('Category created!');
        getAllCategories();
      } else {
        toast.dismiss();
        toast.error('error');
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error('Server error');
      setIsLoading(false);
    }
  };

  const handleEdit = async (e: FormEvent<HTMLFormElement>, cat: any) => {
    e.preventDefault();
    try {
      toast.loading('Updating...');
      const fd = new FormData(e.target as HTMLFormElement);
      const newName = fd.getAll('newName').toString();
      const currentCategories = category.map((item: any) => item.name);
      if (currentCategories.includes(newName)) {
        toast.error('Category name already exists');
        return null;
      }
      console.log(fd.getAll('files'));

      const uploadedFiles = await uploadFiles(fd);
      const url = uploadedFiles.map((img) => img.data?.url).toString();
      const key = uploadedFiles.map((img) => img.data?.key).toString();
      const formData = {
        id: cat._id,
        name: newName,
        image: {
          key,
          url,
        },
      };

      const res = await updateCategory(formData);
      if (res.success) {
        await deleteFiles(cat.image.key);
        toast.dismiss();
        toast.success('Category updated!');
        getAllCategories();
      } else {
        toast.dismiss();
        toast.error('error');
      }
    } catch (error) {}
  };

  const handleDelete = async (cat: any) => {
    try {
      toast.loading('Deleting...');
      await deleteCategory(cat._id);
      await deleteFiles(cat.image.key);
      toast.dismiss();
      toast.success(`Deleted ${cat.name}`);
      getAllCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditButton = (cat: any) => {
    setEditActive(editActive === cat.name ? null : cat.name);
  };
  return (
    <>
      <Toaster position="top-center"></Toaster>
      <div className="flex flex-col gap-12 ml-6">
        <div className="flex flex-col gap-6 ">
          <h1 className=" text-3xl font-bold">Create a New Category</h1>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <p className=" font-semibold text-sm">Category name</p>
              <Input
                name="name"
                type="text"
                placeholder="Type your new category here..."
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className=" font-semibold text-sm">Category image</p>
              <Input name="files" type="file" required />
            </div>

            <Button type="submit">{isLoading ? 'Loading...' : 'Create'}</Button>
          </form>
        </div>
        <div className="flex flex-col gap-6 ">
          <h1 className=" text-3xl font-bold">Current Categories</h1>
          {category.map((cat: any) => (
            <main key={cat._id}>
              <div className="flex">
                <p className="font-semibold text-lg">{cat.name}</p>
              </div>
              <div className="flex  w-full justify-between  p-2 items-center ">
                <Image
                  src={cat.image?.url}
                  alt="category image"
                  width={50}
                  height={100}
                />
                <div className="flex gap-6">
                  <Button onClick={() => handleEditButton(cat)}>Edit</Button>
                  <AlertDialog.Root>
                    <AlertDialog.Trigger asChild>
                      <Button variant={'destructive'}>Delete</Button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Portal>
                      <AlertDialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
                      <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                          Are you absolutely sure?
                        </AlertDialog.Title>
                        <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
                          This action cannot be undone.
                        </AlertDialog.Description>
                        <div className="flex justify-end gap-[25px]">
                          <AlertDialog.Cancel asChild>
                            <Button>Cancel</Button>
                          </AlertDialog.Cancel>
                          <AlertDialog.Action asChild>
                            <Button
                              onClick={() => handleDelete(cat)}
                              variant={'destructive'}
                            >
                              Yes, delete category
                            </Button>
                          </AlertDialog.Action>
                        </div>
                      </AlertDialog.Content>
                    </AlertDialog.Portal>
                  </AlertDialog.Root>
                </div>
              </div>
              <div
                className={`transition-all transform duration-500  ease-in-out ${
                  editActive === cat.name
                    ? ' scale-y-100 opacity-100 translate-y-0'
                    : 'scale-y-0 opacity-0 -translate-y-2'
                } `}
              >
                {editActive === cat.name && (
                  <section
                    className={` flex flex-col  shadow-md w-full gap-4 bg-slate-100 p-2 rounded-md  `}
                  >
                    <form onSubmit={(e) => handleEdit(e, cat)}>
                      <div className="pt-3 flex flex-col gap-2 ">
                        <p className="font-semibold">Enter new name</p>
                        <Input
                          placeholder={cat.name}
                          name="newName"
                          type="text"
                        />
                        <p className="font-semibold">Upload new image</p>
                        <Input
                          placeholder={cat.name}
                          name="files"
                          type="file"
                        />
                      </div>
                      <div className=" mt-3 flex justify-center space-x-4 pb-3">
                        <Button
                          type="submit"
                          className=" bg-blue-500 hover:bg-blue-900"
                        >
                          Confirm
                        </Button>
                        <Button onClick={() => setEditActive('')}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </section>
                )}
              </div>
              <Separator />
            </main>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
