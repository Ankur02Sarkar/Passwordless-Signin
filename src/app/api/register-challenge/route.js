import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateRegistrationOptions } from "@simplewebauthn/server";

export async function POST(req) {
  try {
    const { email, username } = await req.json();
    const challengePayload = await generateRegistrationOptions({
      rpID: process.env.RPID,
      rpName: "My Localhost Machine",
      attestationType: "none",
      userName: username,
      timeout: 30_000,
    });

    console.log("challengePayload : ", challengePayload.challenge);

    return NextResponse.json({ options: challengePayload }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the Passkey." },
      { status: 500 }
    );
  }
}
