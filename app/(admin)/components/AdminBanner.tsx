'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getBanner, updateBanner } from '@/lib/actions/banner.action';
import { deleteFiles, uploadFiles } from '@/lib/actions/files.action';
import Image from 'next/image';
import { FormEvent, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

const AdminBanner = ({ banner }: any) => {
  const [bannerId, setBannerId] = useState('');
  const [base64Image, setBase64Image] = useState<string | null>(null);

  console.log('banner: ', banner);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      convertFileToBase64(file);
    }
  };
  const convertFileToBase64 = (file: File) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setBase64Image(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      toast.loading('Updating...');
      const fd = new FormData(e.target as HTMLFormElement);
      const uploadedFiles = await uploadFiles(fd);
      const imgUrl = uploadedFiles.map((img) => img.data?.url).toString();
      const imgKey = uploadedFiles.map((img) => img.data?.key).toString();
      const formData = {
        id: banner._id,
        imgUrl,
        imgKey,
      };

      const res = await updateBanner(formData);
      if (res.success) {
        await deleteFiles(banner.imgKey);
        toast.dismiss();
        toast.success('Banner updated!');
      } else {
        toast.dismiss();
        toast.error('error');
      }
    } catch (error) {
      toast.dismiss();
      toast.error('error');
      console.log(error);
    }
  };
  return (
    <main>
      <Toaster position="top-center"></Toaster>
      <div className="flex flex-col gap-6">
        <h1 className=" font-bold text-3xl">Current Banner</h1>
        {banner.imgUrl && (
          <Image
            src={banner.imgUrl}
            alt="banner"
            width={728}
            height={90}
            priority
            style={{ margin: 'auto' }}
          />
        )}
      </div>
      <div className="flex flex-col gap-6">
        <h1 className=" font-bold text-3xl">Change Banner</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex w-full justify-between gap-2">
            <Input type="file" name="files" onChange={handleImageChange} />

            <Button>Change</Button>
          </div>
          <div>
            {base64Image && (
              <Image
                src={base64Image}
                alt="thumbnail"
                width={728}
                height={90}
              />
            )}
          </div>
        </form>
      </div>
    </main>
  );
};

export default AdminBanner;
