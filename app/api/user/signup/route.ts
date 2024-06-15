import { NextRequest, NextResponse } from "next/server";
import { authSchema } from "@/app/valiadtionScheme"
import prisma from "@/prisma/client";

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
    const newUser = await prisma.user.create({
        data : {username, password, email}
    })
    return NextResponse.json(newUser, {status : 201});
}