import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    await connectMongoDB();
    const {
      email,
      name,
      username,
      image,
      bio,
      facebook,
      insta,
      youtube,
      twitter,
    } = await req.json();
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        name,
        username,
        image,
        bio,
        facebook,
        insta,
        youtube,
        twitter,
      },
      { new: true } // Return the updated document
    );
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
