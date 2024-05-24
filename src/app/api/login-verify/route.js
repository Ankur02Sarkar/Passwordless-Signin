import { verifyAuthenticationResponse } from "@simplewebauthn/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { passkey, challenge, cred } = await req.json();

    const result = await verifyAuthenticationResponse({
      expectedChallenge: challenge,
      expectedOrigin: "http://localhost:3000",
      expectedRPID: "localhost",
      response: cred,
      authenticator: passkey,
    });

    if (!result.verified) return res.json({ error: "something went wrong" });

    // Login the user: Session, Cookies, JWT
    return NextResponse.json({ ...result }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while Verifying the Passkey." },
      { status: 500 }
    );
  }
}
