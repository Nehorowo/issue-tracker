import prisma from "@/prisma/client";
import { IssuesSummary } from "./IssuesSummary";
import { LatestIssues } from "./LatestIssues";
import { Flex, Grid } from "@radix-ui/themes";
import { IssuesChart } from "./IssuesChart";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  const countProps = {
    open,
    inProgress,
    closed,
  };

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5" justify="between">
        <IssuesSummary {...countProps} />
        <IssuesChart {...countProps} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
