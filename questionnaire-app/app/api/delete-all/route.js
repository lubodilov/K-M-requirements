import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const deleteCount = await prisma.submission.deleteMany({});
    return NextResponse.json({ success: true, deleted: deleteCount.count });
  } catch (error) {
    console.error("Failed to delete submissions:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
