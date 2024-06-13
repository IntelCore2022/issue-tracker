import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { issueScheme } from "@/app/valiadtionScheme";


export async function POST(request : NextRequest) {
    const body = await request.json();
    const validation = issueScheme.safeParse(body);
    if(!validation.success){
        return NextResponse.json({error : validation.error.errors, status :  400});
    }
    const newIssue = await prisma.issue.create({
        data:{title:body.title, description:body.description}
    })
    return NextResponse.json(newIssue, {status : 201});
}


export async function GET(request: NextRequest) {
    try {
        // Fetch all issues from the database
        const issues = await prisma.issue.findMany();
        return NextResponse.json(issues, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch issues', details: "Unknown error occured" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json({ error: 'Issue ID is required' }, { status: 400 });
        }

        const deletedIssue = await prisma.issue.delete({
            where: { id : parseInt(id)},
        });

        return NextResponse.json(deletedIssue, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: 'Failed to delete issue', details: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'Failed to delete issue', details: 'Unknown error occurred' }, { status: 500 });
        }
    }
}