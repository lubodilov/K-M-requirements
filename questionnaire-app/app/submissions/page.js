import { PrismaClient } from "@prisma/client";
import SubmissionsClient from "./SubmissionsClient";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export default async function SubmissionsPage() {
  let submissions = [];
  try {
    submissions = await prisma.submission.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch submissions:", error);
  }

  return <SubmissionsClient submissions={submissions} />;
}
