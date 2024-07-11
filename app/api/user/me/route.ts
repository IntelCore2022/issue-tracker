import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    // create a route to get user details from token 
    const token = request.cookies.get('token')?.value;
    if (!token) {
        console.log("User not found hello");
        return NextResponse.json({ message: "User not logged in", status: 401 });
    }
    const user = await jwtVerify(token, new TextEncoder().encode(process.env.SECRET_KEY));
    if (!user) {
        return NextResponse.json({ message: "User not found", status: 404 });
    }
    const response = NextResponse.json({ user, message: "User logged out successfully", status: 200 });
    return response;
}