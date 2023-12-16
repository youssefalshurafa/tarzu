'use client';
import CheckoutWizard from './CheckoutWizard';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import Header from './shared/Header';
import { ArrowBigLeft } from 'lucide-react';
import { useCartContext } from '@/lib/context/cartContext';
import { OrderDetails, UserInfo } from '@/lib/Types';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { createOrder } from '@/lib/actions/order.action';

interface Props {
  userData: UserInfo;
}
const OrderComplete: React.FC<Props> = ({ userData }) => {
  const { cartItems } = useCartContext();

  const [shippingRate, setShippingRate] = useState(0);

  const priceTotal = cartItems?.map((item) => item.price * item.quantity);
  const sum = priceTotal.reduce((accumulator, currentNumber) => {
    return accumulator + currentNumber;
  }, 0);

  useEffect(() => {
    sum > 1500 ? setShippingRate(0) : setShippingRate(50);
  });

  const newOrder = {
    user: userData.id,
    cartItems: cartItems.map((item) => ({
      quantity: item.quantity,
      size: item.size,
      product: item._id,
    })),

    sum: sum + shippingRate,
  };

  const onUpdate = async () => {
    try {
      const res = await createOrder(newOrder);
      if (res.success) {
        toast.success('Order Placed!');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="mt-7 p-4 w-full flex flex-col justify-between">
      <Toaster position="top-center"></Toaster>
      <Header />
      <Link href={'/'}>
        <button className=" flex items-center border border-solid font-poppins border-neutral-700 mb-6 px-2 hover:bg-neutral-700 hover:text-white">
          <span className=" pt-1 px-1">
            <ArrowBigLeft size={24} />
          </span>{' '}
          CONTINUE SHOPPING
        </button>
      </Link>
      <CheckoutWizard activeStep={2} />
      <div className=" w-full md:max-w-4xl mx-auto bg-gray-100 mt-4 font-poppins p-4">
        <h1 className=" text-3xl font-bold mb-3 text-center">Order Details</h1>
        <div className="mb-3">
          <p>{userData.name}</p>
          <p>{userData.phoneNumber}</p>
          <p>{userData.address}</p>
        </div>
        <div className="flex flex-col gap-4">
          {cartItems?.map((product, i) => (
            <div className="  w-full items-center flex justify-between" key={i}>
              <div>
                <img
                  width={100}
                  height={100}
                  src={product?.thumbnail?.imgUrl}
                  alt=""
                />
              </div>
              <div>
                <p>Size</p>
                <p>{product.size}</p>
              </div>
              <div>
                <p>Quantity</p>
                <p>{product.quantity}</p>
              </div>
            </div>
          ))}
          <div className="mx-auto mb-4">
            <Button onClick={onUpdate}>Place Order</Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderComplete;
