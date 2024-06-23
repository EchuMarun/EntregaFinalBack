import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const cartCollection = 'cart';

const cartSchema = new mongoose.Schema({
  products: [
    {
      _id: false,
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

cartSchema.plugin(mongoosePaginate);

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;
