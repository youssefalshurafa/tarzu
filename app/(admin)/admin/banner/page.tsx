'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getBanner, updateBanner } from '@/lib/actions/banner.action';
import { deleteFiles, uploadFiles } from '@/lib/actions/files.action';
import Image from 'next/image';
import { FormEvent, useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

const Page = () => {
  const [bannerUrl, setBannerUrl] = useState('');
  const [bannerId, setBannerId] = useState('');
  const [oldImgKeys, setOldImgKeys] = useState('');

  const fetchBanner = async () => {
    try {
      const res = await getBanner();
      setBannerUrl(res?.data.map((item: any) => item.imgUrl).toString());
      setOldImgKeys(res?.data.map((item: any) => item.imgKey).toString());
      setBannerId(res?.data.map((item: any) => item._id).toString());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      toast.loading('Updating...');
      const fd = new FormData(e.target as HTMLFormElement);
      const uploadedFiles = await uploadFiles(fd);
      const imgUrl = uploadedFiles.map((img) => img.data?.url).toString();
      const imgKey = uploadedFiles.map((img) => img.data?.key).toString();
      const formData = {
        id: bannerId,
        imgUrl,
        imgKey,
      };

      const res = await updateBanner(formData);
      if (res.success) {
        await deleteFiles(oldImgKeys);
        toast.dismiss();
        toast.success('Banner updated!');
        fetchBanner();
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
        {bannerUrl && (
          <Image
            src={bannerUrl}
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
        <form className="flex gap-4" onSubmit={handleSubmit}>
          <Input type="file" name="files" />
          <Button>Change</Button>
        </form>
      </div>
    </main>
  );
};

export default Page;
