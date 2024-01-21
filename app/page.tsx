import prisma from "@/prisma/client";
import { IssuesSummary } from "./IssuesSummary";
import { LatestIssues } from "./LatestIssues";
import { Flex } from "@radix-ui/themes";
import { IssuesChart } from "./IssuesChart";

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  return (
    <Flex direction="column" gap="5">
      <LatestIssues />
      <IssuesSummary open={open} inProgress={inProgress} closed={closed} />
      <IssuesChart open={open} inProgress={inProgress} closed={closed} />
    </Flex>
  );
}
