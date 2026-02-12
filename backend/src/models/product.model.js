import mongoose from "mongoose"
import { createSlugify } from "../utils/createSlug.js"

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      unique: true,
      index: true
    },

    description: {
      type: String,
      trim: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },
    discountPrice: {
      type: Number,
      default: 0,
      min: 0
    },
    stock: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },
    images: [
      {
        url: String,
        public_id: String
      }
    ],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

// Pre-save hook to generate slug
productSchema.pre("save", function () {
  if (this.isModified("name")) {
    this.slug = createSlugify(this.name) // just set slug
  }
})

export default mongoose.model("Product", productSchema);