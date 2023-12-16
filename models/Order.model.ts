import mongoose from 'mongoose';
import User from '@/models/user.model';
import Product from '@/models/product.model';

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    cartItems: [
      {
        quantity: { type: Number },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        size: { type: String },
      },
    ],
    sum: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

export default Order;
