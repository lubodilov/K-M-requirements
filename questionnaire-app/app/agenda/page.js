import { PrismaClient } from "@prisma/client";
import AgendaClient from "./AgendaClient";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export default async function AgendaPage() {
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
    console.error("Failed to fetch latest submission:", error);
  }

  return (
    <AgendaClient
      latestSubmission={latestSubmission}
      participants={participants}
    />
  );
}
