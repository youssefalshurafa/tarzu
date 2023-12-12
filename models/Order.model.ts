import mongoose from 'mongoose';
import Product from '@/models/product.model';
import User from '@/models/user.model';

const orderSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  cartItems: [
    {
      type: String,
    },
  ],
  sum: Number,
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
