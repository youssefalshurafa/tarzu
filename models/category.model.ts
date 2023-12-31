import mongoose from 'mongoose';
import Product from '@/models/product.model';
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    url: String,
    key: String,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
});

const Category =
  mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category;
