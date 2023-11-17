import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { ProductType } from '../Types';

const initialState = {
  //@ts-ignore
  items: Cookies.get('bag') ? JSON.parse(Cookies.get('bag')) : [],
};

export const bagSlice = createSlice({
  name: 'bag',
  initialState,
  reducers: {
    addToBag: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item: ProductType) => item._id === action.payload._id
      );
      const itemSize = state.items.findIndex(
        (item: ProductType) => item.size === action.payload.size
      );
      if (itemIndex >= 0 && itemSize >= 0) {
        state.items[itemSize].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.items = [...state.items, tempProduct];
      }
      Cookies.set('bag', JSON.stringify(state.items));
    },
    removeFromBag: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item: ProductType) => item._id === action.payload._id
      );
      let newBag = [...state.items];

      if (itemIndex >= 0) {
        newBag.splice(itemIndex, 1);
      } else {
        console.warn(`cant remove product (id: ${action.payload})`);
      }
      state.items = newBag;
      Cookies.set('bag', JSON.stringify(newBag));
    },
    decrementFromBag: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item: ProductType) => item._id === action.payload._id
      );
      const itemSize = state.items.findIndex(
        (item: ProductType) => item.size === action.payload.size
      );
      let newCart = [...state.items];
      if (state.items[itemIndex].cartQuantity > 1) {
        state.items[itemSize].cartQuantity -= 1;
      } else if (state.items[itemIndex].cartQuantity === 1) {
        newCart.splice(itemIndex, 1);
      }
      state.items = newCart;
      Cookies.set('bag', JSON.stringify(state.items));
    },
  },
});

export const { addToBag, removeFromBag, decrementFromBag } = bagSlice.actions;

export const selectItems = (state: any) => state.bag.items;
export const selectTotal = (state: any) =>
  state.bag.items.reduce(
    (total: any, item: any) => total + item.price * item.cartQuantity,
    0
  );

export default bagSlice.reducer;
