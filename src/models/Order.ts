import { model, models, Schema } from "mongoose";

const orderSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
    },
  ],
  price: Number,
  delivered: Boolean,
  address: String,
});

export default models.Order || model("Order", orderSchema);
