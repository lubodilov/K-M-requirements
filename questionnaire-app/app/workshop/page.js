import { PrismaClient } from "@prisma/client";
import WorkshopClient from "./WorkshopClient";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export default async function WorkshopPage() {
  let latestSubmission = null;
  let participants = [];

  try {
    latestSubmission = await prisma.submission.findFirst({
      orderBy: { createdAt: "desc" },
    });
    if (latestSubmission && latestSubmission.workshopParticipants) {
      participants = JSON.parse(latestSubmission.workshopParticipants);
    }
  } catch (error) {
    console.error("Failed to fetch latest submission for workshop:", error);
  }

  return (
    <WorkshopClient
      latestSubmission={latestSubmission}
      participants={participants}
    />
  );
}
