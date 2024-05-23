import { NextResponse } from "next/server";
import { generateRegistrationOptions } from "@simplewebauthn/server";

export async function POST(req) {
  try {
    const { userObj } = await req.json();
    const rpID = "localhost";
    const userName = userObj?.username;
    const challengePayload = await generateRegistrationOptions({
      rpID,
      rpName: "My Localhost Machine",
      attestationType: "none",
      userName,
      timeout: 30_000,
    });

    return NextResponse.json({ options: challengePayload }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the Passkey." },
      { status: 500 }
    );
  }
}
