import { NextRequest, NextResponse } from "next/server";
import { authSchema } from "@/app/valiadtionScheme"
import prisma from "@/prisma/client";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"

let SECRET_KEY:any = process.env.SECRET_KEY;

export async function POST(request : NextRequest){
    const body = await request.json();
    const validation = authSchema.safeParse(body);
    if(!validation.success){
        return NextResponse.json({error : validation.error.errors, status :  400});
    }
    const {username, password, email} = body;
    const user = await prisma.user.findUnique({
        where : {email}
    })
    if(user){
        return NextResponse.json({error : 'User already exists', status : 400});
    }
    const salt = bcrypt.genSaltSync(12)
    const hashPass = bcrypt.hashSync(password, salt);
    await prisma.user.create({
        data : {username, password:hashPass, email}
    })
    const token = jwt.sign({ body }, SECRET_KEY);
    const response = NextResponse.json({user, status : 200});
    response.cookies.set('token', token, {
        httpOnly : true,
        expires : new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
    return response;
}