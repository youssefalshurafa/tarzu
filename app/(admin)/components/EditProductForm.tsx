'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  validateEditThumbnail,
  validateFiles,
  validateThumbnail,
} from '@/lib/validations/product';
import { FormEvent, useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { editProduct } from '@/lib/actions/products.action';
import { toast, Toaster } from 'react-hot-toast';
import { Loader2, X } from 'lucide-react';
import {
  deleteFiles,
  uploadFiles,
  uploadThumbnail,
} from '@/lib/actions/files.action';
import Image from 'next/legacy/image';
import { Category, ProductType } from '@/lib/Types';
import { useProductContext } from '@/lib/context/productContext';

interface Props {
  handleCancel: () => void;
  categories: Category[];
  product: ProductType;
}
interface FormData {
  title: string;
  code: string;
  description: string;
  price: string;
  category: string;
  stock: string;
  material: string;
  thumbnail: File | null;
  files: File[] | null;
}
const EditProductForm: React.FC<Props> = ({
  categories,
  product,
  handleCancel,
}) => {
  const { getCategories } = useProductContext();
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [base64Images, setBase64Images] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [oldCategory, setOldCategory] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    title: product.title,
    code: product.code,
    description: product.description || '',
    price: product.price,
    category: product.category._id,
    stock: product.stock || '',
    material: product.material || '',
    thumbnail: null,
    files: null,
  });
  useEffect(() => {
    setOldCategory(product.category._id);
  }, []);

  console.log('formData :', formData);

  const handleEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const ThumbError = validateEditThumbnail(formData.thumbnail);
      if (ThumbError) {
        setErrors({ thumbnail: ThumbError });
        return;
      }
      const filesError = validateFiles(formData.files);
      if (filesError) {
        setErrors({ files: filesError });
        return;
      }

      setErrors({});

      if (formData.thumbnail && !formData.files) {
        const fd = new FormData(e.target as HTMLFormElement);
        const uploadedThumbnail = await uploadThumbnail(fd);
        const editedProduct = {
          _id: product._id,
          title: formData.title,
          code: formData.code,
          price: formData.price,
          material: formData.material,
          oldCategory: oldCategory,
          category: formData.category,
          thumbnail: {
            imgKey: uploadedThumbnail.map((item) => item.data?.key).toString(),
            imgUrl: uploadedThumbnail.map((item) => item.data?.url).toString(),
          },
        };
        deleteFiles(product.thumbnail?.imgKey);
        const res = await editProduct(editedProduct);
        if (res.success) {
          setIsLoading(false);
          toast.dismiss();
          handleCancel();
          await getCategories();
          toast.success('Product updated!');
        } else {
          console.log('res', res);
          setIsLoading(false);
          toast.dismiss();
          toast.error('error');
        }
      } else if (formData.files && !formData.thumbnail) {
        const fd = new FormData(e.target as HTMLFormElement);
        const uploadedFiles = await uploadFiles(fd);
        const editedProduct = {
          _id: product._id,
          title: formData.title,
          code: formData.code,
          price: formData.price,
          material: formData.material,
          oldCategory: oldCategory,
          category: formData.category,
          images: [
            {
              key: uploadedFiles.map((item) => item.data?.key).toString(),
              url: uploadedFiles.map((item) => item.data?.url).toString(),
            },
          ],
        };
        const oldImgKeys = product.images.map((product) => product.key);

        await deleteFiles(oldImgKeys);
        const res = await editProduct(editedProduct);
        if (res.success) {
          setIsLoading(false);
          toast.dismiss();
          handleCancel();
          await getCategories();
          toast.success('Product updated!');
        } else {
          console.log('res', res);
          setIsLoading(false);
          toast.dismiss();
          toast.error('error');
        }
      } else if (formData.files && formData.thumbnail) {
        const fd = new FormData(e.target as HTMLFormElement);

        const uploadedThumbnail = await uploadThumbnail(fd);
        const uploadedFiles = await uploadFiles(fd);
        const editedProduct = {
          _id: product._id,
          title: formData.title,
          code: formData.code,
          price: formData.price,
          material: formData.material,
          oldCategory: oldCategory,
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
        const oldImgKeys = product.images.map((product) => product.key);

        await deleteFiles(oldImgKeys);
        await deleteFiles(product.thumbnail?.imgKey);
        const res = await editProduct(editedProduct);
        if (res.success) {
          setIsLoading(false);
          toast.dismiss();
          handleCancel();
          await getCategories();
          toast.success('Product updated!');
        } else {
          console.log('res', res);
          setIsLoading(false);
          toast.dismiss();
          toast.error('error');
        }
        console.log('editProduct :', editedProduct);
      }

      const editedProduct = {
        _id: product._id,
        title: formData.title,
        code: formData.code,
        price: formData.price,
        material: formData.material,
        oldCategory: oldCategory,
        category: formData.category,
      };
      const res = await editProduct(editedProduct);
      if (res.success) {
        setIsLoading(false);
        toast.dismiss();
        handleCancel();
        await getCategories();
        toast.success('Product updated!');
      } else {
        console.log('res', res);
        setIsLoading(false);
        toast.dismiss();
        toast.error('error');
      }
      console.log('editProduct :', editedProduct);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
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

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      convertFilesToBase64(files);
      const newImages: File[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        validateThumbnail(file);
        newImages.push(file);
      }
      setFormData({ ...formData, files: newImages || null });
    }
  };
  const convertFilesToBase64 = (files: FileList) => {
    const newBase64Images: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          newBase64Images.push(reader.result);
          setBase64Images([...newBase64Images]);
        }
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="z-30">
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
            defaultValue={product.title}
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
          <p>Material *</p>
          <Input
            type="text"
            defaultValue={product.material}
            className="border no-focus"
            name="material"
            onChange={handleInputChange}
          />
          {errors['material'] && (
            <p style={{ color: 'red' }}>{errors['material']}</p>
          )}
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
                {categories.map((cat: Category) => (
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

        {formData.thumbnail && base64Image ? (
          <Image src={base64Image} alt="thumbnail" width={50} height={50} />
        ) : (
          <Image
            src={product.thumbnail?.imgUrl || ''}
            alt="thumbnail"
            width={50}
            height={50}
          />
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
        <div className="flex gap-2">
          {formData.files?.length && base64Images.length
            ? base64Images.map((base64, index) => (
                <div key={index} style={{ marginRight: 10, marginBottom: 10 }}>
                  <Image src={base64} alt="thumbnail" width={50} height={50} />{' '}
                </div>
              ))
            : product.images.map((image) => (
                <Image src={image.url} alt="thumbnail" width={50} height={50} />
              ))}
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

        {isLoading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Updating
          </Button>
        ) : (
          <Button type="submit" className=" bg-purple-700">
            Edit
          </Button>
        )}
      </form>
    </div>
  );
};

export default EditProductForm;
