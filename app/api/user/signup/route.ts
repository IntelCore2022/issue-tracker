import { NextRequest, NextResponse } from "next/server";
import { authSchema } from "@/app/valiadtionScheme";
import prisma from "@/prisma/client";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

const SECRET_KEY: any = process.env.SECRET_KEY;

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = authSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json({ error: validation.error.errors, status: 400 });
    }

    const { username, password, email } = body;

    // Check if a user with the same email or username already exists
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { email },
                { username }
            ]
        }
    });

    if (existingUser) {
        return NextResponse.json({ error: 'User with this email or username already exists', status: 400 });
    }

    const salt = bcrypt.genSaltSync(12);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = await prisma.user.create({
        data: { username, password: hashPass, email }
    });

    if (!newUser) {
        return NextResponse.json({ error: 'Error occurred while creating user', status: 400 });
    }

    const token = jwt.sign({ body }, SECRET_KEY);

    const response = NextResponse.json({ user: newUser, status: 200 });
    response.cookies.set('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });

    return response;
}
