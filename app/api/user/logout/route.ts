import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const response = NextResponse.json({ message: "User logged out successfully", status: 200 });
    response.cookies.set("token", "", {
        httpOnly: true,
    });
    console.log("Repeated")
    return response;
}