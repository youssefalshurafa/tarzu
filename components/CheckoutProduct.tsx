import { ProductType } from '@/lib/Types';
import { useCartContext } from '@/lib/context/cartContext';
import Link from 'next/link';

import 'react-toastify/dist/ReactToastify.css';

interface Props {
  product: ProductType;
}
const CheckoutProduct: React.FC<Props> = ({ product }) => {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
    useCartContext();

  const handleRemoveFromCart = (product: ProductType) => {
    removeFromCart(product);
  };
  const handleAddToCart = async (product: ProductType) => {
    await addToCart(product);
  };

  return (
    <div className=" grid grid-cols-3 md:grid md:grid-cols-6 justify-between w-full  border-b">
      <div className=" col-span-1 md:col-span-1 p-1  mx-auto">
        <Link href={`/product/${product.code}`}>
          <img
            width={100}
            height={100}
            src={product?.thumbnail?.imgUrl}
            alt=""
          />
        </Link>
      </div>
      <div className=" col-span-2 md:col-span-3 flex mx-2 md:mx-5  justify-between items-center">
        <div className="md:flex md:space-x-8 font-poppins">
          <p>{product.title}</p>
          <p>LE {product.price}</p>
          <p>Size: {product.size}</p>
        </div>
        <div className="flex space-x-3 items-center">
          <div className=" flex space-x-3 font-poppins border p-2 shadow-md items-center">
            <span
              onClick={() => {
                const cartItem = cartItems.find(
                  (item) => item._id === product._id
                );
                if (cartItem.quantity === 1) {
                  handleRemoveFromCart(product);
                } else {
                  removeFromCart(product);
                }
              }}
              className=" cursor-pointer hover:text-xl"
            >
              -
            </span>
            <p className=" cursor-default">{product.quantity}</p>
            <span
              onClick={() => {
                handleAddToCart(product);
              }}
              className=" cursor-pointer hover:text-xl"
            >
              +
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProduct;
