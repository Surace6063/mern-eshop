import mongoose from "mongoose"
import { createSlugify } from "../utils/createSlug.js"

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    slug: {
      type: String,
      unique: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    image: {
        url: {type: String, required: true},
        public_id: {type: String, required: true}
    }
  },
  { timestamps: true }
)

// pre-save hook to generate slug
categorySchema.pre("save", function () {
  if (this.isModified("name")) {
    this.slug = createSlugify(this.name)
  }
})

export default mongoose.model("Category", categorySchema)
