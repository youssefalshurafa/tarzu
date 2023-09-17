import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
  imgUrl: String,
  imgKey: String,
});

const Banner = mongoose.models.Banner || mongoose.model('Banner', bannerSchema);

export default Banner;
