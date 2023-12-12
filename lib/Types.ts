export type UserInfo = {
  _id?: string;
  id: string;
  __v?: number;
  email?: string;
  name: string;
  onboarded?: boolean;
  orders?: string;
  address: string;
  phoneNumber: string;
  roles?: {
    User: number;
    Editor: number;
    Admin: number;
  };
};

export type Roles = {
  Admin: string;
  Editor: string;
  User: string;
};

export type ProductType = {
  _id?: string;
  title: string;
  code: string;
  description?: string;
  price: string;
  category: Category;
  stock?: string;
  material?: string;
  quantity: number;
  size?: string;
  thumbnail: Thumbnail | undefined;
  images: Res[];
};
export type Thumbnail = {
  imgKey: string;
  imgUrl: string;
};

export type Res = {
  key: string;
  url: string;
};

export type Category = {
  image: Res;
  name: string;
  products: ProductType[];
  _id: string;
};

export type OrderDetails = {
  cartItems: ProductType[];
  sum: number;
  userData: UserInfo;
};
