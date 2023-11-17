import { ProductType } from '@/lib/Types';
import { useCartContext } from '@/lib/context/cartContext';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  product: ProductType;
}
const CheckoutProduct: React.FC<Props> = ({ product }) => {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
    useCartContext();
  const notifyRemovedFromCart = (item: any) =>
    toast.error(`${item.title} removed from cart!`, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
      style: {
        backgroundColor: '#000',
        color: '#fff',
      },
    });

  const notifyCartCleared = () =>
    toast.error(`Cart cleared!`, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
      style: {
        backgroundColor: '#000',
        color: '#fff',
      },
    });

  const handleRemoveFromCart = (product: ProductType) => {
    removeFromCart(product);
    notifyRemovedFromCart(product);
  };
  return (
    <>
      <ToastContainer />
      <div className=" grid grid-cols-3 md:grid md:grid-cols-6 w-full  border-b">
        <div className=" col-span-1 md:col-span-1 p-1  mx-auto">
          <Link href={`/product/${product.title}`}>
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
            <div
              onClick={() => {
                clearCart();
                notifyCartCleared();
              }}
              className="mr-2 cursor-pointer"
            >
              <Trash2 />
            </div>
            <div className=" flex space-x-3 font-poppins border p-2 shadow-md">
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
                className=" cursor-pointer"
              >
                -
              </span>
              <p className=" cursor-default">{product.quantity}</p>
              <span
                onClick={() => {
                  addToCart(product);
                }}
                className=" cursor-pointer"
              >
                +
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutProduct;
