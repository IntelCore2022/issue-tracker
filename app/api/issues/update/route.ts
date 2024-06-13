import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/prisma/client';

export async function GET(request: NextRequest) {
    try {
        // Extract the issue ID from the query parameters
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Issue ID is required' }, { status: 400 });
        }

        // Fetch a single issue by ID
        const issue = await prisma.issue.findUnique({
            where: { id: parseInt(id) },
        });

        if (!issue) {
            return NextResponse.json({ error: 'Issue not found', status: 404 });
        }

        return NextResponse.json(issue, { status: 200 });
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json(
          { error: "Failed to update issue", details: error.message },
          { status: 500 }
        );
      } else {
        // Fallback for unknown error type
        return NextResponse.json(
          { error: "Failed to update issue", details: "Unknown error occurred" },
          { status: 500 }
        );
      }
    }
}


export async function PUT(request: NextRequest) {
  try {
    // Extract the issue ID from the query parameters
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Issue ID is required" },
        { status: 400 }
      );
    }
    const body = await request.json();

    // Attempt to update the issue
    const updatedIssue = await prisma.issue.update({
      where: { id: parseInt(id) },
      data: body,
    });

    // Return the updated issue with a 200 status code
    return NextResponse.json(updatedIssue, { status: 200 });
  } catch (error) {
    // Type guard for error to ensure it has a message property
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to update issue", details: error.message },
        { status: 500 }
      );
    } else {
      // Fallback for unknown error type
      return NextResponse.json(
        { error: "Failed to update issue", details: "Unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
