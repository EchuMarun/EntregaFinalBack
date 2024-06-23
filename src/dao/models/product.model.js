import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const collectionProducts = 'product';
const productSchema = new mongoose.Schema({
  title: String,
  code: String,
  price: Number,
  stock: Number,
  category: String,
  description: String,
  status: {
    type: Boolean,
    default: true,
  },
  thumbnails: {
    type: Array,
    default: [],
  },
});

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(collectionProducts, productSchema);
