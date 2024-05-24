import { NextResponse } from "next/server";
import { verifyRegistrationResponse } from "@simplewebauthn/server";

export async function POST(req) {
  try {
    const { cred, challenge } = await req.json();
    const expectedRPID = "localhost";
    const expectedOrigin = "http://localhost:3000";
    const verifyResp = await verifyRegistrationResponse({
      expectedChallenge: challenge,
      expectedOrigin,
      expectedRPID,
      response: cred,
    });
    if (!verifyResp.verified)
      return NextResponse.json({ error: "Could Not Verify" }, { status: 401 });

    // Store Passkey to DB
    // verifyResp.registrationInfo

    return NextResponse.json({ ...verifyResp }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while Verifying the Passkey." },
      { status: 500 }
    );
  }
}
