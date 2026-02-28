import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6
    },

    fullName: {
      type: String,
      required: true,
      trim: true
    },

    phone: {
      type: String,
      default: ""
    },

    avatar: {
      type: String,
      default: ""
    },

    address: {
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      postalCode: { type: String, default: "" },
      country: { type: String, default: "" }
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    emailVerificationToken: String,
    emailVerificationExpires: Date,
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

export default mongoose.model("User", userSchema)
