import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { z } from "zod";

const loginSchema = z.object({
    username : z.string().min(1, 'Username is required').max(255),
    password : z.string().min(1, 'Password is required').max(255),
})

export async function POST(request : NextRequest){
    try {
        const body = await request.json();
        const validation = loginSchema.safeParse(body);
        if(!validation.success){
            return NextResponse.json({error : validation.error.errors, status :  400});
        }
        const {username, password} = body;
        const user = await prisma.user.findUnique({
            where : {username}
        })
        if(!user){
            return NextResponse.json({error : 'User not found', status : 404});
        }
        if(user.password !== password){
            return NextResponse.json({error : 'Invalid password', status : 401});
        }
        return NextResponse.json(user, {status : 200});
    } catch (error:any) {
        return NextResponse.json({error : 'Failed to fetch user', details : error.message}, {status : 500});
    }
}