import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const data = await request.json();

    // Helper to safely stringify arrays
    const safeStringify = (val) => (Array.isArray(val) ? JSON.stringify(val) : val);

    const submission = await prisma.submission.create({
      data: {
        tsOwnerName: data.tsOwnerName,
        tsOwnerRole: data.tsOwnerRole,
        tsOwnerEmail: data.tsOwnerEmail,
        
        irOwnerName: data.irOwnerName,
        irOwnerRole: data.irOwnerRole,
        irOwnerEmail: data.irOwnerEmail,
        
        itContactName: data.itContactName,
        itContactRole: data.itContactRole,
        itContactEmail: data.itContactEmail,
        
        workshopParticipants: safeStringify(data.workshopParticipants),
        
        tsPriorityRegions: safeStringify(data.tsPriorityRegions),
        tsTenderPortals: safeStringify(data.tsTenderPortals),
        tsProjectTypes: data.tsProjectTypes,
        tsExclusions: data.tsExclusions,
        tsKeywords: safeStringify(data.tsKeywords),
        tsContractors: safeStringify(data.tsContractors),
        
        irCompetitors: safeStringify(data.irCompetitors),
        irTechThemes: safeStringify(data.irTechThemes),
        irMarketTopics: safeStringify(data.irMarketTopics),
        irResourceTopics: safeStringify(data.irResourceTopics),
        irSources: safeStringify(data.irSources),
        irKeywords: safeStringify(data.irKeywords),
        
        usersTenderScout: safeStringify(data.usersTenderScout),
        usersInnovation: safeStringify(data.usersInnovation),
        alertsTenderScout: safeStringify(data.alertsTenderScout),
        alertsInnovation: safeStringify(data.alertsInnovation),
        
        mustHaves: data.mustHaves,
        niceToHaves: data.niceToHaves,
        constraints: data.constraints,
      },
    });

    return NextResponse.json({ success: true, submissionId: submission.id });
  } catch (error) {
    console.error("Error saving submission:", error);
    return NextResponse.json({ success: false, error: "Failed to save submission" }, { status: 500 });
  }
}
