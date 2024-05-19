import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
      unique: true,
    },
    image: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    facebook: {
      type: String,
      required: false,
    },
    insta: {
      type: String,
      required: false,
    },
    youtube: {
      type: String,
      required: false,
    },
    twitter: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const User = models?.User || mongoose.model("User", userSchema);
export default User;
