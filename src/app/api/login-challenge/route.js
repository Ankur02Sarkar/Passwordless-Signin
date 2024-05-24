import { generateAuthenticationOptions } from "@simplewebauthn/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const rpID = "localhost";
    const opts = await generateAuthenticationOptions({ rpID });

    // challengeStore[userId] = opts.challenge;
    console.log("opts.challenge : ", opts.challenge);

    return NextResponse.json({ options: opts }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while creating Login Challenge." },
      { status: 500 }
    );
  }
}
