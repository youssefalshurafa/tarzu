'use client';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import React, { FormEvent, useState } from 'react';
import { uploadFiles } from '@/lib/actions/files.action';
import { createCategory, deleteCategory } from '@/lib/actions/category.action';

const CategoryAdmin = ({ category }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [editActive, setEditActive] = useState<any>(false);
  const [newName, setNewName] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const fd = new FormData(e.target as HTMLFormElement);
      const uploadedFiles = await uploadFiles(fd);
      const url = uploadedFiles.map((img) => img.data?.url).toString();
      const key = uploadedFiles.map((img) => img.data?.key).toString();
      const name = fd.getAll('name').toString();

      const formData = {
        name,
        image: {
          url,
          key,
        },
      };

      await createCategory(formData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (cat: any) => {
    try {
      console.log('id: ', cat._id);

      await deleteCategory(cat._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditButton = (category: any) => {};
  return (
    <>
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
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className=" font-semibold text-sm">Category image</p>
              <Input name="files" type="file" />
            </div>

            <Button type="submit">{isLoading ? 'Loading...' : 'Create'}</Button>
          </form>
        </div>
        <div className="flex flex-col gap-6 ">
          <h1 className=" text-3xl font-bold">Current Categories</h1>
          {category.map((cat: any) => (
            <main key={cat._id}>
              <div className="flex  w-full justify-between  p-2 items-center">
                <div className="flex">
                  <p className="font-semibold text-lg">{cat.name}</p>
                </div>

                <div className="flex gap-6">
                  <Button>Edit</Button>
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
                  editActive === category
                    ? ' scale-y-100 opacity-100 translate-y-0'
                    : 'scale-y-0 opacity-0 -translate-y-2'
                } `}
              >
                {editActive === category && (
                  <section
                    className={` flex flex-col shadow-md w-full gap-4 bg-slate-100 p-2 rounded-md  `}
                  >
                    <div className="pt-3">
                      <Input
                        placeholder="Enter new name here"
                        type="text"
                        onChange={(e) => setNewName(e.target.value)}
                      />
                    </div>
                    <div className=" flex justify-center space-x-4 pb-3">
                      <Button className=" bg-blue-500 hover:bg-blue-900">
                        Confirm
                      </Button>
                      <Button onClick={() => setEditActive('')}>Cancel</Button>
                    </div>
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

export default CategoryAdmin;
