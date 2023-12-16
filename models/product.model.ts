import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  description: { type: String },
  price: {
    type: String,
    required: [true, 'Please provide a price'],
  },
  size: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  stock: String,
  material: {
    type: String,
  },

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
