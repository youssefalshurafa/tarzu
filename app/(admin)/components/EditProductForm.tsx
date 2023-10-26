'use client';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  ProductValidation,
  editProductValidation,
  validateFiles,
  validateThumbnail,
} from '@/lib/validations/product';
import { FormEvent, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createProduct, editProduct } from '@/lib/actions/products.action';
import { toast, Toaster } from 'react-hot-toast';
import { X } from 'lucide-react';
import { uploadFiles, uploadThumbnail } from '@/lib/actions/files.action';
import Image from 'next/image';
import { Category, ProductType, Res } from '@/lib/Types';

interface Props {
  handleCancel: () => void;
  categories: Category[];
  product: ProductType;
}
const EditProductForm: React.FC<Props> = ({
  categories,
  product,
  handleCancel,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<{
    title: string;
    code: string;
    description: string;
    price: string;
    category: string;
    stock: string;
    thumbnail: File | null;
    files: File[] | null;
  }>({
    title: '',
    code: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    thumbnail: null,
    files: null,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const ThumbError = validateThumbnail(formData.thumbnail);
      if (ThumbError) {
        setErrors({ thumbnail: ThumbError });
        return;
      }
      const filesError = validateFiles(formData.files);
      if (filesError) {
        setErrors({ files: filesError });
        return;
      }
      await ProductValidation.parse(formData);
      console.log('formData :', formData);
      setErrors({});
      if (formData.files) {
        toast.loading('Creating...');
        const fd = new FormData(e.target as HTMLFormElement);

        const uploadedThumbnail = await uploadThumbnail(fd);
        const uploadedFiles = await uploadFiles(fd);

        const newProduct = {
          title: formData.title,
          code: formData.code,
          price: formData.price,
          category: formData.category,
          thumbnail: {
            imgKey: uploadedThumbnail.map((item) => item.data?.key).toString(),
            imgUrl: uploadedThumbnail.map((item) => item.data?.url).toString(),
          },
          images: [
            {
              key: uploadedFiles.map((item) => item.data?.key).toString(),
              url: uploadedFiles.map((item) => item.data?.url).toString(),
            },
          ],
        };
        console.log('newProduct: ', newProduct);
        const res = await createProduct(newProduct);
        if (res.success) {
          toast.dismiss();
          location.reload();
          toast.success('Product created!');
        } else {
          console.log('res', res);

          toast.dismiss();
          toast.error('error');
        }
      } else {
        toast.loading('Creating...');
        const fd = new FormData(e.target as HTMLFormElement);

        const uploadedThumbnail = await uploadThumbnail(fd);

        const newProduct = {
          title: formData.title,
          code: formData.code,
          price: formData.price,
          category: formData.category,
          thumbnail: {
            imgKey: uploadedThumbnail.map((item) => item.data?.key).toString(),
            imgUrl: uploadedThumbnail.map((item) => item.data?.url).toString(),
          },
        };
        console.log('newProduct: ', newProduct);
        const res = await createProduct(newProduct);
        if (res.success) {
          toast.dismiss();
          location.reload();
          toast.success('Product created!');
        } else {
          toast.dismiss();
          toast.error('error');
        }
      }
    } catch (error) {
      toast.dismiss();
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        error.issues.forEach((issue) => {
          fieldErrors[issue.path.join('.')] = issue.message;
        });
        setErrors(fieldErrors);
      }
    }
  };
  const handleEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // await editProductValidation.parse(formData);
      // const ThumbError = validateThumbnail(formData.thumbnail);
      // if (ThumbError) {
      //   setErrors({ thumbnail: ThumbError });
      //   return;
      // }
      // const filesError = validateFiles(formData.files);
      // if (filesError) {
      //   setErrors({ files: filesError });
      //   return;
      // }

      console.log('formData :', formData);
      setErrors({});
    } catch (error) {}
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (name === 'thumbnail') {
      if (!files) return null;
      setFormData({ ...formData, [name]: files[0] || null });
    }
  };
  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: File[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        validateThumbnail(file);
        newImages.push(file);
      }
      setFormData({ ...formData, files: newImages || null });
    }
  };

  return (
    <div>
      <Toaster position="top-center"></Toaster>
      <div className="mb-2 w-full flex justify-end ">
        <div className="w-max hover:cursor-pointer  rounded-xl ">
          <X onClick={handleCancel} size={24} />
        </div>
      </div>
      <form onSubmit={handleEdit} className="flex flex-col justify-start gap-4">
        <div className="flex flex-col gap-2 font-semibold">
          <p>Title *</p>
          <Input
            type="text"
            className="border no-focus"
            name="title"
            value={product.title}
            onChange={handleInputChange}
          />
          {errors['title'] && <p style={{ color: 'red' }}>{errors['title']}</p>}
        </div>

        <div className="flex flex-col gap-2 font-semibold">
          <p>Code *</p>
          <Input
            type="text"
            defaultValue={product.code}
            className="border no-focus"
            name="code"
            onChange={handleInputChange}
          />
          {errors['code'] && <p style={{ color: 'red' }}>{errors['code']}</p>}
        </div>

        <div className="flex flex-col gap-2 font-semibold">
          <p>Price *</p>
          <Input
            type="text"
            defaultValue={product.price}
            className="border no-focus"
            name="price"
            onChange={handleInputChange}
          />
          {errors['price'] && <p style={{ color: 'red' }}>{errors['price']}</p>}
        </div>

        <div className="flex flex-col gap-2 font-semibold">
          <p>Category *</p>
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                {categories.map((cat: any) => (
                  <SelectItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors['category'] && (
            <p style={{ color: 'red' }}>{errors['category']}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 font-semibold">
          <p>Thumbnail *</p>
          <Input
            type="file"
            className="border no-focus"
            name="thumbnail"
            onChange={handleImageChange}
          />
          {errors['thumbnail'] && (
            <p style={{ color: 'red' }}>{errors['thumbnail']}</p>
          )}
        </div>
        {product.thumbnail ? (
          <Image
            src={product.thumbnail.imgUrl}
            alt="thumbnail"
            width={50}
            height={50}
          />
        ) : (
          ''
        )}

        <div className="flex flex-col gap-2 font-semibold">
          <p>Images</p>
          <Input
            type="file"
            multiple
            className="border no-focus"
            name="files"
            onChange={handleFilesChange}
          />
          {errors['files'] && <p style={{ color: 'red' }}>{errors['files']}</p>}
        </div>

        <div className="flex flex-col gap-2 font-semibold">
          <p>Description</p>
          <Textarea
            rows={3}
            className="border no-focus"
            name="description"
            defaultValue={product.description}
            onChange={(e) => handleInputChange}
          />
          {errors['description'] && (
            <p style={{ color: 'red' }}>{errors['description']}</p>
          )}
        </div>

        <Button type="submit" className=" bg-purple-700">
          {isLoading ? 'Loading...' : 'Edit'}
        </Button>
      </form>
    </div>
  );
};

export default EditProductForm;
