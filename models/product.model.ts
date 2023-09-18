import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  description: { type: String },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
  },
  size: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  stock: Number,

  thumbnail: {
    imgKey: String,
    imgUrl: String,
  },

  images: [
    {
      key: String,
      url: String,
    },
  ],
});

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
