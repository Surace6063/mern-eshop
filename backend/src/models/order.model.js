import mongoose from "mongoose"

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // checkout info (can be different from user)
    fullName: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    phoneNumber: {
      type: String,
      required: true
    },

    companyName: String,
    vatNumber: String,

    address: {
      type: String,
      required: true
    },

    zipCode: String,

    paymentMethod: {
      type: String,
      enum: ["cod", "esewa"],
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "completed", "cancelled","failed"],
      default: "pending"
    },

    items: [orderItemSchema]
  },
  { timestamps: true }
)

export default mongoose.model("Order", orderSchema)